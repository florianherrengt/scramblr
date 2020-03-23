import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Note } from './note.entity';

@Entity()
@ObjectType()
export class Tag {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 50 })
    label: string;

    @ManyToMany(type => Note)
    notes: Note[];

    @ManyToOne(
        type => User,
        user => user.username,
        { onDelete: 'CASCADE' },
    )
    user: User;
}
