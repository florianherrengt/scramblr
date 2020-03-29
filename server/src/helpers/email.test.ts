import { sendConfirmEmail } from './email';
import { Container } from 'typedi';
import { User } from '../entities';

describe('helpers/email', () => {
    it('sendConfirmEmail()', () => {
        const mockedTransporter = {
            sendMail: jest.fn().mockReturnValue(true),
        };
        Container.set('nodemailer.transporter', mockedTransporter);
        const user: User = {
            username: 'test',
            emailConfirmed: false,
            email: 'test@example.com',
            password: 'test',
        };
        sendConfirmEmail(user);
        const [[{ html }]] = mockedTransporter.sendMail.mock.calls;

        expect(html).toContain('/api/email/verify?token=');
    });
});
