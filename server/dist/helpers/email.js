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
const config = require("config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const routes_1 = require("./routes");
const typedi_1 = require("typedi");
typedi_1.Container.set('nodemailer.transporter', nodemailer.createTransport({
    host: config.get('Smtp.host'),
    port: config.get('Smtp.port'),
    secure: Boolean(parseInt(config.get('Smtp.secure'), 10)),
    auth: {
        user: config.get('Smtp.username'),
        pass: config.get('Smtp.password'),
    },
}));
exports.sendConfirmEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jwt.sign({ email: user.email }, config.get('Jwt.secret'));
    const verifyUrl = `${config.get('App.protocol')}://${config.get('App.domain')}${routes_1.AppRoutes.confirmEmail}?token=${token}`;
    return exports.sendEmail({
        from: 'no-reply@' + config.get('Smtp.domain'),
        to: user.email,
        subject: 'Scramblr: Verify your email address',
        html: `Open the following link in your browser to verify your email address.\n<a href="${verifyUrl}">${verifyUrl}</a>`,
        text: `Open the following link in your browser to verify your email address.\n${verifyUrl}`,
    });
});
exports.sendEmail = (options) => {
    const transporter = typedi_1.Container.get('nodemailer.transporter');
    return transporter.sendMail(options);
};
//# sourceMappingURL=email.js.map