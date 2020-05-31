import { PaymentMethod } from '../entities';
interface CustomerData {
    id: string;
    subscription: {
        id: string | null;
    };
    paymentMethods: PaymentMethod[];
}
export declare const getStripeCustomerByEmail: (email?: string | undefined) => Promise<CustomerData | null>;
export {};
