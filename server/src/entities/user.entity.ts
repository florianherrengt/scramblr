import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Note } from './note.entity';
import { Tag } from './tag.entitiy';

@Entity()
@ObjectType()
export class User {
    @Field(type => ID)
    @PrimaryColumn({ nullable: false, length: 100 })
    username: string;

    @Column({ nullable: false, length: 100 })
    password: string;

    @OneToMany(
        type => Note,
        note => note.id,
        { onDelete: 'CASCADE' },
    )
    notes: Note[];

    @OneToMany(
        type => Tag,
        tag => tag.id,
        { onDelete: 'CASCADE' },
    )
    tags: Tag[];
}
