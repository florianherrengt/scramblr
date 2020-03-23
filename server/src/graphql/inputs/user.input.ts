import { InputType, Field } from 'type-graphql';
import { User } from '../../entities/user.entity';

@InputType()
export class SignUpInput implements Partial<User> {
    @Field()
    username: string;

    @Field({ nullable: true })
    password: string;
}

@InputType()
export class SignInInput implements Partial<User> {
    @Field()
    username: string;

    @Field({ nullable: true })
    password: string;
}
