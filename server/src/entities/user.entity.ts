import { Field, ID, ObjectType, Int } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Note } from './note.entity';
import { Tag } from './tag.entitiy';
import { PaymentMethod } from './PaymentMethods.entity';

@Entity()
@ObjectType()
export class User {
    @Field((type) => ID)
    @PrimaryColumn({ nullable: false, length: 100 })
    username: string;

    @Field({ nullable: true })
    @Column({ nullable: true, length: 100 })
    email?: string;

    @Field(() => Int, { defaultValue: false })
    @Column({ default: false })
    emailConfirmed: boolean;

    @Column({ nullable: false, length: 100 })
    password: string;

    @Field(() => [PaymentMethod], { nullable: true })
    paymentMethods: PaymentMethod[];

    @Field(() => Int, { nullable: true, defaultValue: false })
    subscribed?: boolean;

    @OneToMany((type) => Note, (note) => note.id, { onDelete: 'CASCADE' })
    notes?: Note[];

    @OneToMany((type) => Tag, (tag) => tag.id, { onDelete: 'CASCADE' })
    tags?: Tag[];
}
