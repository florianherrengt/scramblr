import { AuthenticationError } from 'apollo-server-express';
import * as config from 'config';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../../entities/user.entity';
import {
    AppContext,
    AppRoutes,
    getStripeContainer,
    getStripeCustomerByEmail,
} from '../../helpers';

const planId = config.get('Stripe.planId') as string;

@Resolver(User)
export class PaymentResolver {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

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
                            subscription_id: customer.subscription.id,
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
}
