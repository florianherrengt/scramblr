import { Tag, TagEmotion } from '../../entities';
export declare class CreateTagInput implements Partial<Tag> {
    label: string;
    emotion: TagEmotion;
}
export declare class UpdateTagInput implements Partial<Tag> {
    id: string;
    label: string;
    emotion: TagEmotion;
}
