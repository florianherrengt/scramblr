import { Repository } from 'typeorm';
import { PaymentMethod, User } from '../../entities';
import { AppContext } from '../../helpers';
export declare class PaymentResolver {
    private readonly userRepository;
    private logger;
    constructor(userRepository: Repository<User>);
    paymentMethods(context: AppContext): Promise<PaymentMethod[]>;
    isSubscribed(context: AppContext): Promise<boolean>;
    stripeSessionId(context: AppContext): Promise<string>;
    updateDefaultPaymentMethod(paymentMethodId: string, context: AppContext): Promise<boolean>;
    deletePaymentMethod(paymentMethodId: string, context: AppContext): Promise<boolean>;
    cancelSubscription(context: AppContext): Promise<boolean>;
}
