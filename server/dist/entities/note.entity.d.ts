import { User } from './user.entity';
import { Tag } from './tag.entitiy';
export declare class Note {
    id: string;
    text: string;
    createdAt: Date;
    user: User;
    tags: Tag[];
}
export interface ExportedNote extends Omit<Omit<Omit<Note, 'user'>, 'tags'>, 'createdAt'> {
    tagId: string;
    createdAt: string;
}
