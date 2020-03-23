import {
  CurrentUserActionSetAesPassphrase,
  SearchNoteAction,
} from '../actions';
import { decrypt } from '../helpers';
import { CurrentUserNotesState } from './currentUserNotesReducer';

interface SearchNotesState extends CurrentUserNotesState {
  searchValue: string;
}

const defaultState: SearchNotesState = {
  notes: [],
  isFetching: false,
  fetched: false,
  hasMore: false,

  searchValue: '',
};

export const searchNotes = (
  state: SearchNotesState = defaultState,
  action: SearchNoteAction | CurrentUserActionSetAesPassphrase,
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
        searchValue: action.searchValue,
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
    default:
      return state;
  }
};
