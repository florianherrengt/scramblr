import { GetNoteAction } from './fetchNotes';
import { DeleteNoteAction } from './deleteNote';
import { CreateNoteAction } from './createNote';
import { SearchNoteAction } from './searchNotes';
import { UpdateNoteAction } from './updateNote';

export * from './fetchNotes';
export * from './createNote';
export * from './updateNote';
export * from './deleteNote';
export * from './searchNotes';

export type NotesAction =
  | GetNoteAction
  | DeleteNoteAction
  | CreateNoteAction
  | SearchNoteAction
  | UpdateNoteAction;
