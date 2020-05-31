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
const stripe_1 = require("./stripe");
const typedi_1 = require("typedi");
const stripeResponse = {
    object: 'list',
    data: [
        {
            id: 'cus_id',
            object: 'customer',
            address: null,
            balance: 0,
            created: 1585766076,
            currency: 'gbp',
            default_source: null,
            delinquent: false,
            description: null,
            discount: null,
            email: 'test@gmail.com',
            invoice_prefix: 'EDAB851E',
            invoice_settings: {
                custom_fields: null,
                default_payment_method: null,
                footer: null,
            },
            livemode: false,
            metadata: {},
            name: null,
            phone: null,
            preferred_locales: [],
            shipping: null,
            sources: {
                object: 'list',
                data: [],
                has_more: false,
                total_count: 0,
                url: '/v1/customers/cus_id/sources',
            },
            subscriptions: {
                object: 'list',
                data: [
                    {
                        id: 'sub_id',
                        object: 'subscription',
                        collection_method: 'charge_automatically',
                        customer: 'cus_id',
                        default_payment_method: 'pm_id',
                        items: {
                            object: 'list',
                            data: [
                                {
                                    id: 'si_123',
                                    object: 'subscription_item',
                                    plan: {
                                        id: 'plan_id',
                                        object: 'plan',
                                        active: true,
                                        amount: 500,
                                        amount_decimal: '500',
                                        billing_scheme: 'per_unit',
                                        created: 1585671868,
                                        currency: 'gbp',
                                        interval: 'month',
                                        nickname: 'Monthly',
                                        product: 'prod_id',
                                    },
                                    quantity: 1,
                                    subscription: 'sub_id',
                                },
                            ],
                        },
                        plan: {
                            id: 'plan_id',
                            object: 'plan',
                            active: true,
                            interval: 'month',
                            nickname: 'Monthly',
                            product: 'prod_id',
                        },
                        status: 'active',
                    },
                ],
            },
        },
    ],
};
describe('helpers/stripe', () => {
    it('getStripeCustomerByEmail()', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockStripe = {
            customers: {
                list: jest.fn().mockReturnValue(stripeResponse),
            },
            paymentMethods: { list: jest.fn().mockReturnValue({ data: [] }) }
        };
        typedi_1.default.set('stripe', mockStripe);
        const customer = yield stripe_1.getStripeCustomerByEmail('fake@email.com');
        expect(customer.id).toEqual('cus_id');
        expect(customer.subscription.id).toEqual('sub_id');
    }));
});
//# sourceMappingURL=stripe.test.js.map