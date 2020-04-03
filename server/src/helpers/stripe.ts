import { PaymentMethod } from '../entities';
import { getStripeContainer } from './containers';

interface CustomerData {
    id: string;
    subscription: {
        id: string;
    };
    paymentMethods: PaymentMethod[];
}

interface StripeResponse {
    data: Array<{ id: string; subscriptions: { data: Array<{ id: string }> } }>;
}

export const getStripeCustomerByEmail = async (
    email?: string,
): Promise<CustomerData | null> => {
    const stripe = getStripeContainer();
    if (!email) {
        return null;
    }
    const customer = await stripe.customers.list({
        email,
        expand: ['data.sources'],
    });

    if (!customer.data.length) {
        return null;
    }

    const customerId = customer.data[0].id;
    const subscriptions = customer.data[0].subscriptions;

    const rawPaymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
        limit: 100,
    });

    const paymentMethods = rawPaymentMethods.data.length
        ? rawPaymentMethods.data.map((paymentMethod) => ({
              id: paymentMethod.id,
              card: {
                  brand: paymentMethod.card!.brand,
                  expMonth: paymentMethod.card!.exp_month,
                  expMonthString: `0${paymentMethod.card!.exp_month}`.slice(-2),
                  expYear: paymentMethod.card!.exp_year,
                  last4: paymentMethod.card!.last4,
              },
          }))
        : [];

    if (!subscriptions?.data.length) {
        console.error(
            'Error: A customer does not have a susbcription. This should not be possible.',
        );
        return null;
    }

    return {
        id: customerId,
        subscription: { id: subscriptions.data[0].id },
        paymentMethods,
    };
};
