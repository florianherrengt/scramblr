import { Field, ObjectType, Int } from 'type-graphql';
import { TagEmotion } from './tag.entitiy';

@ObjectType()
class InsightData {
    @Field()
    label: string;

    @Field(() => Int)
    [TagEmotion.positive]: number;

    @Field(() => Int)
    [TagEmotion.negative]: number;
}

@ObjectType()
export class Insight {
    @Field(() => [InsightData])
    week: InsightData[];
    @Field(() => [InsightData])
    month: InsightData[];
    @Field(() => [InsightData])
    year: InsightData[];
}
