import { decrypt, Note, Tag } from '../../helpers';
import { CurrentUserActionSetAesPassphrase, NotesAction } from '../actions';

type StateNote = Omit<Note, 'tags'> & {
    tags: Array<Pick<Tag, 'id'>>;
    isLoading: boolean;
    transactionId?: string;
    revert?: StateNote;
};

export interface CurrentUserNotesState {
    notes: StateNote[];
    isFetching: boolean;
    error?: string;
    fetched: boolean;
    hasMore: boolean;
    total: number;
}

export const defaultState: CurrentUserNotesState = {
    notes: [],
    isFetching: false,
    fetched: false,
    hasMore: false,
    total: 0,
};

export const currentUserNotes = (
    state: CurrentUserNotesState = defaultState,
    action: NotesAction | CurrentUserActionSetAesPassphrase,
): CurrentUserNotesState => {
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
        case 'GET_CURRENT_USER_NOTES_REQUEST':
            return { ...state, ...action, isFetching: true, error: '' };
        case 'GET_CURRENT_USER_NOTES_SUCCESS':
            const notes = [
                ...state.notes,
                ...action.notes.items.map(note => ({
                    ...note,
                    isLoading: false,
                })),
            ];
            return {
                ...state,
                notes,
                hasMore: action.notes.hasMore,
                fetched: true,
                isFetching: false,
                total: action.notes.total,
                error: '',
            };
        case 'GET_CURRENT_USER_NOTES_FAILURE':
            return {
                ...state,
                fetched: true,
                isFetching: false,
                error: 'Failed fetching notes',
            };

        case 'DELETE_NOTE_REQUEST':
            return {
                ...state,
                notes: state.notes.map(note => ({
                    ...note,
                    isLoading: note.id === action.id,
                })),
                error: '',
            };

        case 'DELETE_NOTE_SUCCESS':
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id),
                total: state.total - 1,
                error: '',
            };

        case 'DELETE_NOTE_FAILURE':
            return {
                ...state,
                notes: state.notes.map(note => ({ ...note, isLoading: false })),
                error: action.error,
            };

        case 'CREATE_NOTE_REQUEST':
            return {
                ...state,
                notes: [
                    {
                        ...action.note,
                        id: action.transactionId,
                        createdAt: new Date(),
                        isLoading: true,
                        transactionId: action.transactionId,
                    },
                    ...state.notes,
                ],
            };

        case 'CREATE_NOTE_SUCCESS':
            return {
                ...state,
                notes: [
                    { ...action.note, isLoading: false },
                    ...state.notes.filter(
                        note => note.transactionId !== action.transactionId,
                    ),
                ],
                total: state.total + 1,
            };

        case 'CREATE_NOTE_FAILURE':
            return {
                ...state,
                notes: state.notes.filter(
                    note => note.transactionId !== action.transactionId,
                ),
            };

        case 'UPDATE_NOTE_REQUEST':
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.note.id
                        ? {
                              ...note,
                              text: action.note.text || note.text,
                              tags: action.note.tags || note.tags,
                              isLoading: true,
                              transactionId: action.transactionId,
                              revert: note,
                          }
                        : note,
                ),
            };

        case 'UPDATE_NOTE_SUCCESS':
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.transactionId === action.transactionId
                        ? { ...action.note, isLoading: false }
                        : note,
                ),
            };

        case 'UPDATE_NOTE_FAILURE':
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.transactionId === action.transactionId
                        ? note.revert!
                        : note,
                ),
            };

        default:
            return state;
    }
};
