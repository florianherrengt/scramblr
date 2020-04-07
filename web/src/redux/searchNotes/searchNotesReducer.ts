import { decrypt } from '../../helpers';
import {
    CurrentUserActionSetAesPassphrase,
    NotesAction,
    SearchNoteAction,
} from '../actions';
import { CurrentUserNotesState } from '../notes';

interface SearchNotesState extends CurrentUserNotesState {}

const defaultState: SearchNotesState = {
    notes: [],
    isFetching: false,
    fetched: false,
    hasMore: false,
    total: 0,
};

export const searchNotes = (
    state: SearchNotesState = defaultState,
    action: SearchNoteAction | CurrentUserActionSetAesPassphrase | NotesAction,
): SearchNotesState => {
    switch (action.type) {
        case 'SIGN_OUT_SUCCESS':
            return defaultState;

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
                total: action.notes.total,
            };
        case 'SEARCH_NOTES_FAILURE':
            return { ...state, ...action, fetched: true, isFetching: false };

        case 'DELETE_NOTE_SUCCESS':
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id),
                total: state.total - 1,
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
