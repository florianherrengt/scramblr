import { ObjectType, Field, ID } from 'type-graphql';
import {
    Entity,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Note } from './note.entity';

import { registerEnumType } from 'type-graphql';

export enum TagEmotion {
    positive = 'positive',
    neutral = 'neutral',
    negative = 'negative',
}

registerEnumType(TagEmotion, {
    name: 'TagEmotion',
});

@Entity()
@ObjectType()
export class Tag {
    @Field((type) => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 500 })
    label: string;

    @Field({ defaultValue: TagEmotion.neutral })
    @Column({ default: TagEmotion.neutral })
    emotion: TagEmotion;

    @ManyToMany((type) => Note)
    notes: Note[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne((type) => User, (user) => user.username, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    user: User;
}
export interface ExportedTag
    extends Omit<
        Omit<Omit<Omit<Tag, 'user'>, 'notes'>, 'createdAt'>,
        'emotion'
    > {
    createdAt: string;
    emotion: string;
}
