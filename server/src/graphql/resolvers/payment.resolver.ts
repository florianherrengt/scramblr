import { AuthenticationError } from 'apollo-server-express';
import * as config from 'config';
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PaymentMethod, User } from '../../entities';
import { AppContext, AppRoutes, getStripeContainer, getStripeCustomerByEmail } from '../../helpers';

const planId = config.get('Stripe.planId') as string;

@Resolver(User)
export class PaymentResolver {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    @Query((returns) => [PaymentMethod])
    async paymentMethods(@Ctx() context: AppContext): Promise<PaymentMethod[]> {
        const { username } = context.user || {};
        if (!username) {
            throw new AuthenticationError('User not logged in');
        }
        const user = await this.userRepository.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.email || !user.emailConfirmed) {
            return [];
        }

        const stripeCustomer = await getStripeCustomerByEmail(user.email);
        if (!stripeCustomer) {
            return [];
        }
        return stripeCustomer.paymentMethods;
    }
    @Query((returns) => String)
    async isSubscribed(@Ctx() context: AppContext): Promise<boolean> {
        if (!config.get('App.requireSubscription')) {
            return true;
        }
        const { username } = context.user || {};
        if (!username) {
            throw new AuthenticationError('User not logged in');
        }
        const user = await this.userRepository.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.email || !user.emailConfirmed) {
            return false;
        }

        const stripeCustomer = await getStripeCustomerByEmail(user.email);
        if (!stripeCustomer || !stripeCustomer.subscription.id) {
            return false;
        }
        return true;
    }
    @Query((returns) => String)
    async stripeSessionId(@Ctx() context: AppContext) {
        if (!context.user?.username) {
            throw new AuthenticationError('User not logged in');
        }
        const user = await this.userRepository.findOne(context.user.username);
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.email || !user.emailConfirmed) {
            throw new Error('Confirmed email missing');
        }
        const baseUrl = `${config.get('App.protocol')}://${config.get(
            'App.domain',
        )}`;
        const customer = await getStripeCustomerByEmail(user.email);
        const stripe = getStripeContainer();
        // existing customer
        if (customer) {
            console.debug(
                'existing customer',
                JSON.stringify(customer, null, 2),
            );
            return (
                await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    customer_email: user.email,
                    mode: 'setup',
                    setup_intent_data: {
                        metadata: {
                            customer_id: customer.id,
                            subscription_id: customer.subscription.id || null,
                        },
                    },
                    success_url: `${baseUrl}${AppRoutes.paymentSuccess}?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${baseUrl}/payment/failed`,
                })
            ).id;
        }

        // new customer
        console.debug('new customer');
        return (
            await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                customer_email: user.email,
                subscription_data: {
                    items: [
                        {
                            plan: planId,
                        },
                    ],
                },
                success_url: `${baseUrl}/settings`,
                cancel_url: `${baseUrl}/payment/failed`,
            })
        ).id;
    }
    @Mutation((returns) => Int)
    async updateDefaultPaymentMethod(
        @Arg('paymentMethodId') paymentMethodId: string,
        @Ctx() context: AppContext,
    ): Promise<boolean> {
        if (!context.user?.username) {
            throw new AuthenticationError('User not logged in');
        }
        const stripe = getStripeContainer();
        const user = await this.userRepository.findOne(context.user.username);
        const stripeCustomer = await getStripeCustomerByEmail(user?.email);
        if (!stripeCustomer) {
            throw new Error('No stripe customer for this user');
        }
        await stripe.customers.update(stripeCustomer.id, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        if (stripeCustomer.subscription.id) {
            await stripe.subscriptions.update(stripeCustomer.subscription.id, {
                default_payment_method: paymentMethodId,
            });
        }
        return true;
    }
    @Mutation((returns) => Int)
    async deletePaymentMethod(
        @Arg('paymentMethodId') paymentMethodId: string,
        @Ctx() context: AppContext,
    ): Promise<boolean> {
        if (!context.user?.username) {
            throw new AuthenticationError('User not logged in');
        }
        const stripe = getStripeContainer();
        await stripe.paymentMethods.detach(paymentMethodId);
        return true;
    }
    @Mutation((returns) => Int)
    async cancelSubscription(@Ctx() context: AppContext): Promise<boolean> {
        if (!context.user?.username) {
            throw new AuthenticationError('User not logged in');
        }
        const stripe = getStripeContainer();
        const user = await this.userRepository.findOne(context.user.username);
        const stripeCustomer = await getStripeCustomerByEmail(user?.email);
        if (!stripeCustomer) {
            throw new Error('No stripe customer for this user');
        }
        if (!stripeCustomer.subscription.id) {
            throw new Error('This user has no subscription');
        }
        await stripe.subscriptions.del(stripeCustomer.subscription.id);
        return true;
    }
}
