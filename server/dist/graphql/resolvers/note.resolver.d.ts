import { AppContext } from 'src/helpers';
import { EntityManager, Repository } from 'typeorm';
import { Tag } from '../../entities';
import { Note } from '../../entities/note.entity';
import { CreateNoteInput, UpdateNoteInput } from '../inputs/note.input';
declare class PaginatedNoteResponse {
    items: Note[];
    total: number;
    hasMore: boolean;
}
export declare class NoteResolver {
    private readonly noteRepository;
    private readonly tagRepository;
    constructor(noteRepository: Repository<Note>, tagRepository: Repository<Tag>);
    currentUserNotes(tagsId: string[], limit: number, skip: number, context: AppContext): Promise<PaginatedNoteResponse>;
    deleteNote(noteId: string, context: AppContext): Promise<Note>;
    updateNote(input: UpdateNoteInput, context: AppContext): Promise<Note>;
    createNote(manager: EntityManager, input: CreateNoteInput, context: AppContext): Promise<any>;
}
export {};
