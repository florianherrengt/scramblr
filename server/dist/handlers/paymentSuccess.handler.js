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
const helpers_1 = require("../helpers");
const logger = helpers_1.getLogger('stripePaymentSuccessHandler');
const getCustomerId = (setupIntent) => {
    var _a;
    if (typeof setupIntent.customer === 'string') {
        return setupIntent.customer;
    }
    if ((_a = setupIntent.customer) === null || _a === void 0 ? void 0 : _a.id) {
        return setupIntent.customer.id;
    }
    if (typeof setupIntent.metadata.customer_id === 'string') {
        return setupIntent.metadata.customer_id;
    }
    throw new Error('No customer id found');
};
const getPaymentMethod = (setupIntent) => {
    var _a;
    if (typeof setupIntent.payment_method === 'string') {
        return setupIntent.payment_method;
    }
    if ((_a = setupIntent.payment_method) === null || _a === void 0 ? void 0 : _a.id) {
        return setupIntent.payment_method.id;
    }
    throw new Error('No payment method id found');
};
exports.stripePaymentSuccessHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stripe = helpers_1.getStripeContainer();
        const session = yield stripe.checkout.sessions.retrieve(request.param('session_id'));
        if (!session.setup_intent) {
            return response
                .status(500)
                .send('Unexpected error: No session.setup_intent is undefined');
        }
        const setupIntentId = session.setup_intent;
        const setupIntent = yield stripe.setupIntents.retrieve(setupIntentId);
        const customerId = getCustomerId(setupIntent);
        const paymentMethods = getPaymentMethod(setupIntent);
        yield stripe.paymentMethods.attach(paymentMethods, {
            customer: customerId,
        });
        yield stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethods,
            },
        });
        if (setupIntent.metadata.subscription_id) {
            yield stripe.subscriptions.update(setupIntent.metadata.subscription_id, {
                default_payment_method: paymentMethods,
            });
        }
        response.redirect('/settings');
    }
    catch (error) {
        logger.error(error);
        response.status(500).send('Unexpected error: ' + error.message);
    }
});
//# sourceMappingURL=paymentSuccess.handler.js.map