import { SearchNoteAction } from '../../searchNotes/actions';
import { CreateNoteAction } from './createNote';
import { DeleteNoteAction } from './deleteNote';
import { GetNoteAction } from './fetchNotes';
import { UpdateNoteAction } from './updateNote';

export * from './createNote';
export * from './deleteNote';
export * from './fetchNotes';
export * from './updateNote';

export type NotesAction =
    | GetNoteAction
    | DeleteNoteAction
    | CreateNoteAction
    | SearchNoteAction
    | UpdateNoteAction;
