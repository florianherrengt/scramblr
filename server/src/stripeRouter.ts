import * as config from 'config';
import Stripe from 'stripe';

const stripe = new Stripe(config.get('Stripe.key'), {
    apiVersion: '2020-03-02',
    typescript: true,
});

(async () => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        subscription_data: {
            items: [
                {
                    plan: config.get('Stripe.planId'),
                },
            ],
        },
        success_url:
            'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/cancel',
    });
})();
