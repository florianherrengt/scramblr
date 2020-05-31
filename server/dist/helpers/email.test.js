"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = require("./email");
const typedi_1 = require("typedi");
describe('helpers/email', () => {
    it('sendConfirmEmail()', () => {
        const mockedTransporter = {
            sendMail: jest.fn().mockReturnValue(true),
        };
        typedi_1.Container.set('nodemailer.transporter', mockedTransporter);
        const user = {
            username: 'test',
            emailConfirmed: false,
            email: 'test@example.com',
            password: 'test',
        };
        email_1.sendConfirmEmail(user);
        const [[{ html }]] = mockedTransporter.sendMail.mock.calls;
        expect(html).toContain('/api/email/confirm?token=');
    });
});
//# sourceMappingURL=email.test.js.map