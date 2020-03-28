import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { SignInInput, SignUpInput } from '../inputs/user.input';
import { AppContext } from '../../helpers';
export declare class UserResolver {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    userExists(username: string): Promise<boolean>;
    currentUser(context: AppContext): Promise<User | undefined>;
    signIn(input: SignInInput, context: AppContext): Promise<string>;
    signUp(input: SignUpInput, context: AppContext): Promise<string>;
    signOut(context: AppContext): Promise<boolean>;
    deleteAccount(context: AppContext): Promise<boolean>;
}
