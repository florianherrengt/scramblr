"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const stripe_1 = require("stripe");
const config = require("config");
var containerName;
(function (containerName) {
    containerName["stripe"] = "stripe";
})(containerName = exports.containerName || (exports.containerName = {}));
typedi_1.default.set(containerName.stripe, new stripe_1.default(config.get('Stripe.key'), {
    apiVersion: '2020-03-02',
    typescript: true,
}));
exports.getStripeContainer = () => typedi_1.default.get(containerName.stripe);
//# sourceMappingURL=containers.js.map