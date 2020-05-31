import { User } from '../entities';
export interface ConfirmEmailToken {
    email: string;
}
export declare const sendConfirmEmail: (user: User) => Promise<Promise<any>>;
export declare const sendEmail: (options: import("nodemailer/lib/mailer").Options) => Promise<Promise<any>>;
