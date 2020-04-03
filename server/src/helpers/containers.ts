import Container from 'typedi';
import Stripe from 'stripe';
import * as config from 'config';

export enum containerName {
    stripe = 'stripe',
}

Container.set(
    containerName.stripe,
    new Stripe(config.get('Stripe.key'), {
        apiVersion: '2020-03-02',
        typescript: true,
    }),
);

export const getStripeContainer = () =>
    Container.get<Stripe>(containerName.stripe);
