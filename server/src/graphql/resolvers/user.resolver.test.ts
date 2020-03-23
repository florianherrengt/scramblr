import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import * as bcrypt from 'bcryptjs';
import { UserResolver } from './user.resolver';
import { Repository } from 'typeorm';
import { User } from 'src/entities';
import { JwtObject } from 'src/helpers/jwt';

describe('Resolvers/User', () => {
    it('signUp', async () => {
        const input = { username: Math.random().toString(), password: Math.random().toString() };
        const fakeUser = { ...input };
        const userRepository = {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockReturnValue(fakeUser),
            save: jest.fn(),
        };
        const resolver = new UserResolver((userRepository as unknown) as Repository<User>);
        const user = jwt.verify(await resolver.signUp(input), config.get('Jwt.secret')) as JwtObject;
        expect(user.username).toEqual(input.username);
        expect(userRepository.create).toHaveBeenCalledTimes(1);
        expect(userRepository.create.mock.calls[0][0].password).not.toEqual(input.password);
    });
    it('signIn', async () => {
        const input = { username: Math.random().toString(), password: Math.random().toString() };
        const fakeUser = { username: input.username, password: bcrypt.hashSync(input.password) };
        const userRepository = { findOne: jest.fn().mockResolvedValue(fakeUser) };
        const resolver = new UserResolver((userRepository as unknown) as Repository<User>);
        const user = jwt.verify(await resolver.signIn(input), config.get('Jwt.secret')) as JwtObject;
        expect(user.username).toBe(input.username);
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
        expect(userRepository.findOne.mock.calls[0][0].where.username).not.toEqual(input.password);
    });
});
