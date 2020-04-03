import { ObjectType, Field, ID } from 'type-graphql';
import { registerEnumType } from 'type-graphql';

export enum CardBrand {
    americanExpress = 'american express',
    dinersClub = 'diners club',
    discover = 'discover',
    jcb = 'jcb',
    mastercard = 'mastercard',
    unionpay = 'unionpay',
    visa = 'visa',
}

registerEnumType(CardBrand, {
    name: 'CardBrand',
});

@ObjectType()
export class Card {
    @Field(() => CardBrand)
    brand: string;
    @Field()
    expMonth: number;
    @Field()
    expMonthString: string;
    @Field()
    expYear: number;
    @Field()
    last4: string;
}
