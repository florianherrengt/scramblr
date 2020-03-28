import { Note } from './note.entity';
import { Tag } from './tag.entitiy';
export declare class User {
    username: string;
    password: string;
    notes: Note[];
    tags: Tag[];
}
