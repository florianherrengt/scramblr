import { User } from './user.entity';
import { Note } from './note.entity';
export declare enum TagEmotion {
    positive = "positive",
    neutral = "neutral",
    negative = "negative"
}
export declare class Tag {
    id: string;
    label: string;
    emotion: TagEmotion;
    notes: Note[];
    createdAt: Date;
    user: User;
}
