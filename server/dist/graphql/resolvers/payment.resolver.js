"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var PaymentResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const config = require("config");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const entities_1 = require("../../entities");
const helpers_1 = require("../../helpers");
const planId = config.get('Stripe.planId');
let PaymentResolver = PaymentResolver_1 = class PaymentResolver {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = helpers_1.getLogger(PaymentResolver_1.name);
    }
    paymentMethods(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = context.user || {};
            if (!username) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const user = yield this.userRepository.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.email || !user.emailConfirmed) {
                return [];
            }
            const stripeCustomer = yield helpers_1.getStripeCustomerByEmail(user.email);
            if (!stripeCustomer) {
                return [];
            }
            return stripeCustomer.paymentMethods;
        });
    }
    isSubscribed(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!config.get('App.requireSubscription')) {
                return true;
            }
            const { username } = context.user || {};
            if (!username) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const user = yield this.userRepository.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.email || !user.emailConfirmed) {
                return false;
            }
            const stripeCustomer = yield helpers_1.getStripeCustomerByEmail(user.email);
            if (!stripeCustomer || !stripeCustomer.subscription.id) {
                return false;
            }
            return true;
        });
    }
    stripeSessionId(context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.username)) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const user = yield this.userRepository.findOne(context.user.username);
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.email || !user.emailConfirmed) {
                throw new Error('Confirmed email missing');
            }
            const baseUrl = `${config.get('App.protocol')}://${config.get('App.domain')}`;
            const customer = yield helpers_1.getStripeCustomerByEmail(user.email);
            const stripe = helpers_1.getStripeContainer();
            // existing customer
            if (customer) {
                this.logger.debug('existing customer', customer);
                return (yield stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    customer_email: user.email,
                    mode: 'setup',
                    setup_intent_data: {
                        metadata: {
                            customer_id: customer.id,
                            subscription_id: customer.subscription.id || null,
                        },
                    },
                    success_url: `${baseUrl}${helpers_1.AppRoutes.paymentSuccess}?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${baseUrl}/payment/failed`,
                })).id;
            }
            // new customer
            this.logger.debug('new customer');
            return (yield stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                customer_email: user.email,
                subscription_data: {
                    items: [
                        {
                            plan: planId,
                        },
                    ],
                },
                success_url: `${baseUrl}/settings`,
                cancel_url: `${baseUrl}/payment/failed`,
            })).id;
        });
    }
    updateDefaultPaymentMethod(paymentMethodId, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.username)) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const stripe = helpers_1.getStripeContainer();
            const user = yield this.userRepository.findOne(context.user.username);
            const stripeCustomer = yield helpers_1.getStripeCustomerByEmail(user === null || user === void 0 ? void 0 : user.email);
            if (!stripeCustomer) {
                throw new Error('No stripe customer for this user');
            }
            yield stripe.customers.update(stripeCustomer.id, {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });
            if (stripeCustomer.subscription.id) {
                yield stripe.subscriptions.update(stripeCustomer.subscription.id, {
                    default_payment_method: paymentMethodId,
                });
            }
            return true;
        });
    }
    deletePaymentMethod(paymentMethodId, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.username)) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const stripe = helpers_1.getStripeContainer();
            yield stripe.paymentMethods.detach(paymentMethodId);
            return true;
        });
    }
    cancelSubscription(context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.username)) {
                throw new apollo_server_express_1.AuthenticationError('User not logged in');
            }
            const stripe = helpers_1.getStripeContainer();
            const user = yield this.userRepository.findOne(context.user.username);
            const stripeCustomer = yield helpers_1.getStripeCustomerByEmail(user === null || user === void 0 ? void 0 : user.email);
            if (!stripeCustomer) {
                throw new Error('No stripe customer for this user');
            }
            if (!stripeCustomer.subscription.id) {
                throw new Error('This user has no subscription');
            }
            yield stripe.subscriptions.del(stripeCustomer.subscription.id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query((returns) => [entities_1.PaymentMethod]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "paymentMethods", null);
__decorate([
    type_graphql_1.Query((returns) => String),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "isSubscribed", null);
__decorate([
    type_graphql_1.Query((returns) => String),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "stripeSessionId", null);
__decorate([
    type_graphql_1.Mutation((returns) => type_graphql_1.Int),
    __param(0, type_graphql_1.Arg('paymentMethodId')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "updateDefaultPaymentMethod", null);
__decorate([
    type_graphql_1.Mutation((returns) => type_graphql_1.Int),
    __param(0, type_graphql_1.Arg('paymentMethodId')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "deletePaymentMethod", null);
__decorate([
    type_graphql_1.Mutation((returns) => type_graphql_1.Int),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "cancelSubscription", null);
PaymentResolver = PaymentResolver_1 = __decorate([
    type_graphql_1.Resolver(entities_1.User),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PaymentResolver);
exports.PaymentResolver = PaymentResolver;
//# sourceMappingURL=payment.resolver.js.map