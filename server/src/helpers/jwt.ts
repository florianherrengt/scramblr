import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { User } from 'src/entities/user.entity';

console.info('jwt secret', config.get('Jwt.secret'));

export interface JwtObject {
    username: string;
}

export const createJwt = (user: User): string => {
    if (!user.username) {
        throw new Error('Jwt needs a username');
    }
    const jwtContent: JwtObject = { username: user.username };
    return jwt.sign(jwtContent, config.get('Jwt.secret'));
};
