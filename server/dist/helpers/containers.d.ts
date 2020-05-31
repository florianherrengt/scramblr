import Stripe from 'stripe';
export declare enum containerName {
    stripe = "stripe"
}
export declare const getStripeContainer: () => Stripe;
