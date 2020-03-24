import {
    CurrentUserActionSetAesPassphrase,
    SearchNoteAction,
    NotesAction,
} from '../actions';
import { decrypt } from '../helpers';
import { CurrentUserNotesState } from './currentUserNotesReducer';

interface SearchNotesState extends CurrentUserNotesState {
}

const defaultState: SearchNotesState = {
    notes: [],
    isFetching: false,
    fetched: false,
    hasMore: false,

};

export const searchNotes = (
    state: SearchNotesState = defaultState,
    action: SearchNoteAction | CurrentUserActionSetAesPassphrase | NotesAction,
): SearchNotesState => {
    switch (action.type) {
        case 'SET_AES_PASSPHRASE':
            return {
                ...state,
                notes: state.notes.map(note => ({
                    ...note,
                    text: decrypt(note.text, action.user.aesPassphrase),
                })),
            };
        case 'SEARCH_NOTES_RESET':
            return defaultState;
        case 'SEARCH_NOTES_REQUEST':
            return {
                ...state,
                ...action,
                isFetching: true,
            };
        case 'SEARCH_NOTES_SUCCESS':
            const notes = action.notes.items.map(note => ({
                ...note,
                isLoading: false,
            }));
            return {
                ...state,
                notes,
                hasMore: action.notes.hasMore,
                fetched: true,
                isFetching: false,
            };
        case 'SEARCH_NOTES_FAILURE':
            return { ...state, ...action, fetched: true, isFetching: false };

        case 'DELETE_NOTE_SUCCESS':
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id),
            };

        case 'UPDATE_NOTE_SUCCESS':
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.note.id
                        ? { ...action.note, isLoading: false }
                        : note,
                ),
            };
        default:
            return state;
    }
};
