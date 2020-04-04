import * as config from 'config';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';
import { Arg, Mutation, Query, Resolver, Ctx, Int } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../../entities/user.entity';
import {
    SignInInput,
    SignUpInput,
    UpdateEmailInput,
} from '../inputs/user.input';
import {
    AppContext,
    appSession,
    sendConfirmEmail,
    createJwt,
    getStripeContainer,
    getStripeCustomerByEmail,
} from '../../helpers';

@Resolver(User)
export class UserResolver {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getUser(username: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ username });
        if (user?.email && user.emailConfirmed) {
            const stripeCustomer = await getStripeCustomerByEmail(user.email);
            if (stripeCustomer) {
                const { paymentMethods, subscription } = stripeCustomer;
                return {
                    ...user,
                    paymentMethods,
                    subscribed: !!subscription.id,
                };
            }
        }
        return user;
    }

    @Query((returns) => Int, { nullable: false })
    async userExists(@Arg('username') username: string): Promise<boolean> {
        const user = await this.userRepository.findOne(username);
        return !!user;
    }

    @Query((returns) => User, { nullable: true })
    async currentUser(@Ctx() context: AppContext): Promise<User | undefined> {
        const { username } = context.user || {};
        if (!username) {
            throw new AuthenticationError('User not logged in');
        }

        return this.getUser(username);
    }

    @Mutation((returns) => String, { nullable: true })
    async signIn(
        @Arg('input') input: SignInInput,
        @Ctx() context: AppContext,
    ): Promise<string> {
        const user = await this.userRepository.findOne({
            where: { username: input.username },
        });
        if (!user || !bcrypt.compareSync(input.password, user.password)) {
            throw new UserInputError('Incorrect username/password');
        }
        const { session } = context.request;
        await appSession.setUsername({ session, username: user.username });

        return createJwt(user);
    }
    @Mutation((returns) => String)
    async signUp(
        @Arg('input') input: SignUpInput,
        @Ctx() context: AppContext,
    ): Promise<string> {
        if (parseInt(config.get('App.registrationDisabled'))) {
            throw new Error('Registration disabled');
        }
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

        const { session } = context.request;
        await appSession.setUsername({ session, username: newUser.username });

        return createJwt(newUser);
    }
    @Mutation((returns) => Int)
    async signOut(@Ctx() context: AppContext): Promise<boolean> {
        const { session } = context.request;
        await appSession.destroy({ session });

        return true;
    }
    @Mutation((returns) => User)
    async updateEmail(
        @Arg('input') input: UpdateEmailInput,
        @Ctx() context: AppContext,
    ) {
        const { username } = context.user || {};
        if (!username) {
            throw new AuthenticationError('User not logged in');
        }
        const user = await this.userRepository.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.email && user.emailConfirmed) {
            throw new Error('Cannot change email');
        }
        user.emailConfirmed = user.email === input.email;
        user.email = input.email;
        await this.userRepository.save(user);
        await sendConfirmEmail(user);
        return this.getUser(username);
    }
    @Mutation((returns) => User)
    async resendConfirmEmail(@Ctx() context: AppContext) {
        const { username } = context.user || {};
        if (!username) {
            throw new AuthenticationError('User not logged in');
        }
        const user = await this.userRepository.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.emailConfirmed) {
            throw new Error('Email already confirmed');
        }
        await sendConfirmEmail(user);

        return this.getUser(username);
    }
    @Mutation((returns) => Int)
    async deleteAccount(@Ctx() context: AppContext) {
        const { user } = context;
        if (!user) {
            throw new AuthenticationError('User not logged in');
        }
        try {
            await this.userRepository.delete(user.username);
            return true;
        } catch (error) {
            throw error;
        }
    }
}
