import { MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import { PrimaryGeneratedColumn } from 'typeorm';
import { MoodRating } from '../../entities';

@InputType()
export class RecordMoodInput {
    @Field((type) => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => MoodRating, { nullable: false })
    @MaxLength(1)
    rating: MoodRating;

    @Field()
    date: Date;
}
