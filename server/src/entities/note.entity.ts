import { ObjectType, Field, ID } from 'type-graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entitiy';

@Entity()
@ObjectType()
export class Note {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 10000 })
    text: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(
        type => User,
        user => user.username,
        {
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    user: User;

    @Field(type => [Tag])
    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];
}

export interface ExportedNote
    extends Omit<Omit<Omit<Note, 'user'>, 'tags'>, 'createdAt'> {
    tagId: string;
    createdAt: string;
}
