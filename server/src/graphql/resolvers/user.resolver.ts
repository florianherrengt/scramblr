import { UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';
import { Arg, Mutation, Query, Resolver, Ctx, Int } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../../entities/user.entity';
import { createJwt } from '../../helpers/jwt';
import { SignInInput, SignUpInput } from '../inputs/user.input';
import { AppContext } from 'src/helpers';

@Resolver(User)
export class UserResolver {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    @Query(returns => Int, { nullable: false })
    async userExists(@Arg('username') username: string): Promise<boolean> {
        const user = await this.userRepository.findOne(username);
        return !!user;
    }

    @Query(returns => User, { nullable: true })
    async currentUser(@Ctx() context: AppContext): Promise<User | undefined> {
        if (!context.user) {
            return;
        }
        const user = await this.userRepository.findOne(context.user.username);
        return user;
    }

    @Mutation(returns => String, { nullable: true })
    async signIn(@Arg('input') input: SignInInput): Promise<string> {
        const user = await this.userRepository.findOne({
            where: { username: input.username },
        });
        if (!user || !bcrypt.compareSync(input.password, user.password)) {
            throw new UserInputError('Incorrect username/password');
        }

        return createJwt(user);
    }
    @Mutation(returns => String)
    async signUp(@Arg('input') input: SignUpInput): Promise<string> {
        if (await this.userRepository.findOne(input.username)) {
            throw new Error('Username already exists');
        }
        const newUser = this.userRepository.create({
            ...input,
            password: bcrypt.hashSync(input.password),
        });
        await this.userRepository.save(newUser);
        if (!newUser) {
            throw new Error('cannot create new user');
        }
        return createJwt(newUser);
    }
    @Mutation(returns => Int)
    async deleteAccount(@Ctx() context: AppContext) {
        if (!context.user) {
            throw new Error('cannot delete user');
        }
        try {
            await this.userRepository.delete(context.user.username);
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }
}
