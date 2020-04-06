import { InputType, Field } from 'type-graphql';

@InputType()
export class AddPaymentMethodInput {
    @Field({ nullable: false })
    paymentMethodId: string;
}
