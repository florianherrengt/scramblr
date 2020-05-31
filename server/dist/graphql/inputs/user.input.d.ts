import { User } from '../../entities/user.entity';
export declare class SignUpInput implements Partial<User> {
    username: string;
    password: string;
}
export declare class SignInInput implements Partial<User> {
    username: string;
    password: string;
}
export declare class UpdateEmailInput implements Partial<User> {
    email: string;
}
