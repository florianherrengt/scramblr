import { InputType, Field, Int } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { Note, Tag } from '../../entities';

@InputType()
class TagNote {
    @Field({ nullable: false })
    id: string;
}

@InputType()
export class CreateNoteInput {
    @Field({ nullable: false })
    @MaxLength(10000)
    text: string;

    @Field(type => [TagNote], { nullable: false })
    tags?: TagNote[];
}

@InputType()
export class UpdateNoteInput {
    @Field({ nullable: false })
    id: string;

    @Field({ nullable: true })
    @MaxLength(10000)
    text: string;

    @Field(type => [TagNote], { nullable: true })
    tags?: TagNote[];
}
