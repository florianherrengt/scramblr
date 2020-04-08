import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum MoodRating {
    sad = 0,
    meh = 1,
    good = 2,
    special = 3,
}

registerEnumType(MoodRating, {
    name: 'MoodRating',
});

@Entity()
@ObjectType()
export class Mood {
    @Field((type) => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => MoodRating)
    @Column({ type: 'int2' })
    rating: MoodRating;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne((type) => User, (user) => user.username, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    user: User;
}
