import { ObjectType, Field, ID } from 'type-graphql';
import {
    Entity,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Note } from './note.entity';

import { registerEnumType } from "type-graphql";

export enum TagEmotion {
    positive = "positive",
    neutral = "neutral",
    negative = "negative",
}

registerEnumType(TagEmotion, {
    name: 'TagEmotion'
})

@Entity()
@ObjectType()
export class Tag {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 50 })
    label: string;

    @Field({ defaultValue: TagEmotion.neutral })
    @Column({ default: TagEmotion.neutral })
    emotion: TagEmotion;

    @ManyToMany(type => Note)
    notes: Note[];

    @ManyToOne(
        type => User,
        user => user.username,
        { onDelete: 'CASCADE' },
    )
    user: User;
}
