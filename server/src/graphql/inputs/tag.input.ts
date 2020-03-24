import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { Tag, TagEmotion } from '../../entities';

@InputType()
export class CreateTagInput implements Partial<Tag> {
    @Field({ nullable: false })
    @MaxLength(50)
    label: string;

    @Field({ defaultValue: TagEmotion.neutral })
    @MaxLength(10)
    emotion: TagEmotion;
}

@InputType()
export class UpdateTagInput implements Partial<Tag> {
    @Field({ nullable: false })
    id: string;

    @Field({ nullable: false })
    @MaxLength(50)
    label: string;

    @Field({ defaultValue: TagEmotion.neutral })
    @MaxLength(10)
    emotion: TagEmotion;
}
