import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { Tag } from '../../entities';

@InputType()
export class CreateTagInput implements Partial<Tag> {
    @Field({ nullable: false })
    @MaxLength(50)
    label: string;
}

@InputType()
export class UpdateTagInput implements Partial<Tag> {
    @Field({ nullable: false })
    id: string;

    @Field({ nullable: false })
    @MaxLength(50)
    label: string;
}
