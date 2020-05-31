"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const containers_1 = require("./containers");
exports.getStripeCustomerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const stripe = containers_1.getStripeContainer();
    if (!email) {
        return null;
    }
    const customer = yield stripe.customers.list({
        email,
        expand: ['data.sources'],
    });
    if (!customer.data.length) {
        return null;
    }
    const customerId = customer.data[0].id;
    const subscriptions = customer.data[0].subscriptions;
    const defaultPaymentMethodId = customer.data[0].invoice_settings.default_payment_method;
    const rawPaymentMethods = yield stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
        limit: 100,
    });
    const paymentMethods = rawPaymentMethods.data.length
        ? rawPaymentMethods.data.map((paymentMethod) => ({
            id: paymentMethod.id,
            isDefault: paymentMethod.id === defaultPaymentMethodId,
            card: {
                brand: paymentMethod.card.brand,
                expMonth: paymentMethod.card.exp_month,
                expMonthString: `0${paymentMethod.card.exp_month}`.slice(-2),
                expYear: paymentMethod.card.exp_year,
                last4: paymentMethod.card.last4,
            },
        }))
        : [];
    return {
        id: customerId,
        subscription: {
            id: (subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.data.length) ? subscriptions.data[0].id : null,
        },
        paymentMethods,
    };
});
//# sourceMappingURL=stripe.js.map