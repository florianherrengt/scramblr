import { Note } from './note.entity';
import { Tag } from './tag.entitiy';
export declare class User {
    username: string;
    email?: string;
    emailConfirmed: boolean;
    password: string;
    notes?: Note[];
    tags?: Tag[];
}
