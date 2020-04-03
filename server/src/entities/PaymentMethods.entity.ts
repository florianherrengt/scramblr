import { ObjectType, Field, ID } from 'type-graphql';
import { Card } from './Card.entity';

@ObjectType()
export class PaymentMethod {
    @Field()
    id: string;

    @Field()
    isDefault: boolean;

    @Field(() => Card)
    card: Card;
}
