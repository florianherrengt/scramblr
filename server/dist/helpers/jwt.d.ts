import { User } from '../entities/user.entity';
export interface JwtObject {
    username: string;
}
export declare const createJwt: (user: User) => string;
