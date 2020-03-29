import * as config from 'config';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities';
import { AppRoutes } from './routes';
import { Container } from 'typedi';

export interface VerifyEmailToken {
    email: string;
}

Container.set(
    'nodemailer.transporter',
    nodemailer.createTransport({
        host: config.get('Smtp.host'),
        port: config.get('Smtp.port'),
        secure: Boolean(parseInt(config.get('Smtp.secure'), 10)),
        auth: {
            user: config.get('Smtp.username'),
            pass: config.get('Smtp.password'),
        },
    }),
);

export const sendConfirmEmail = async (
    user: User,
): ReturnType<typeof sendEmail> => {
    const token = jwt.sign(
        { email: user.email } as VerifyEmailToken,
        config.get('Jwt.secret'),
    );
    const verifyUrl = `${config.get('App.protocol')}://${config.get(
        'App.domain',
    )}${AppRoutes.confirmEmail}?token=${token}`;
    return sendEmail({
        from: 'no-reply@' + config.get('Smtp.domain'),
        to: user.email,
        subject: 'Scramblr: Verify your email address',
        html: `Open the following link in your browser to verify your email address.\n<a href="${verifyUrl}">${verifyUrl}</a>`,
        text: `Open the following link in your browser to verify your email address.\n${verifyUrl}`,
    });
};

export const sendEmail = (
    options: nodemailer.SendMailOptions,
): Promise<ReturnType<nodemailer.Transporter['sendMail']>> => {
    const transporter = Container.get<nodemailer.Transporter>(
        'nodemailer.transporter',
    );

    return transporter.sendMail(options);
};
