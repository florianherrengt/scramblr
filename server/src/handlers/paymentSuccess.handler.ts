import { Handler } from 'express';
import { getStripeContainer } from '../helpers';
import Stripe from 'stripe';

interface StripeSession {
    customer: string;
    mode: string;
    customer_email: string;
    display_items: { plan: { id: string; active: boolean } }[];
    subscription: string;
}

const getCustomerId = (setupIntent: Stripe.SetupIntent): string => {
    if (typeof setupIntent.customer === 'string') {
        return setupIntent.customer;
    }
    if (setupIntent.customer?.id) {
        return setupIntent.customer.id;
    }
    if (typeof setupIntent.metadata.customer_id === 'string') {
        return setupIntent.metadata.customer_id;
    }
    console.debug(JSON.stringify({ setupIntent }, null, 2));
    throw new Error('No customer id found');
};

const getPaymentMethod = (setupIntent: Stripe.SetupIntent): string => {
    if (typeof setupIntent.payment_method === 'string') {
        return setupIntent.payment_method;
    }
    if (setupIntent.payment_method?.id) {
        return setupIntent.payment_method.id;
    }
    throw new Error('No payment method id found');
};

export const stripePaymentSuccessHandler: Handler = async (
    request,
    response,
) => {
    try {
        const stripe = getStripeContainer();
        const session = await stripe.checkout.sessions.retrieve(
            request.param('session_id'),
        );
        if (!session.setup_intent) {
            return response
                .status(500)
                .send('Unexpected error: No session.setup_intent is undefined');
        }
        const setupIntentId = session.setup_intent as string;
        const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);

        const customerId = getCustomerId(setupIntent);
        const paymentMethods = getPaymentMethod(setupIntent);

        await stripe.paymentMethods.attach(paymentMethods, {
            customer: customerId,
        });

        await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethods,
            },
        });

        if (setupIntent.metadata.subscription_id) {
            await stripe.subscriptions.update(
                setupIntent.metadata.subscription_id,
                {
                    default_payment_method: paymentMethods,
                },
            );
        }

        response.redirect('/settings');
    } catch (error) {
        console.error(error);

        response.status(500).send('Unexpected error: ' + error.message);
    }
};
