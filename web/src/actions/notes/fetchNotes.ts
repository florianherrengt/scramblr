import { ThunkAction } from 'redux-thunk';
import { api, decrypt, GetCurrentUserNotesQuery, GetCurrentUserNotesQueryVariables } from '../../helpers';
import { RootState } from '../../reducers';

export interface GetNotesActionFetching {
  type: 'GET_CURRENT_USER_NOTES_REQUEST';
}

export interface GetNotesActionSuccess {
  type: 'GET_CURRENT_USER_NOTES_SUCCESS';
  notes: GetCurrentUserNotesQuery['currentUserNotes'];
  aesPassphrase?: string;
}

export interface GetNotesActionFailure {
  type: 'GET_CURRENT_USER_NOTES_FAILURE';
  error: string;
}

export type GetNoteAction =
  | GetNotesActionFetching
  | GetNotesActionSuccess
  | GetNotesActionFailure;

interface Options {
  variables?: GetCurrentUserNotesQueryVariables;
  forceReload?: boolean;
}

export const fetchCurrentUserNotes = (
  options?: Options,
): ThunkAction<Promise<void>, RootState, Options, GetNoteAction> => async (
  dispatch,
  getState,
  ) => {
    const state = getState();

    if (
      state.currentUserNotes.isFetching ||
      (state.currentUserNotes.fetched && !state.currentUserNotes.hasMore)
    ) {
      return;
    }

    if (!options?.forceReload) {
      if (state.currentUserNotes.fetched) {
        return;
      }
    }
    dispatch({
      type: 'GET_CURRENT_USER_NOTES_REQUEST',
      isFetching: true,
    });
    try {
      const { currentUserNotes } = await api.getCurrentUserNotes(
        options?.variables,
      );

      if (!currentUserNotes) {
        dispatch({
          type: 'GET_CURRENT_USER_NOTES_FAILURE',
          error: 'No notes returned',
        });
        return;
      }
      dispatch({
        type: 'GET_CURRENT_USER_NOTES_SUCCESS',
        notes: {
          ...currentUserNotes,
          items: currentUserNotes.items.map(note => ({
            ...note,
            text: state.currentUser.aesPassphrase
              ? decrypt(note.text, state.currentUser.aesPassphrase)
              : note.text,
          })),
        },
        aesPassphrase: state.currentUser.aesPassphrase,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'GET_CURRENT_USER_NOTES_FAILURE',
        error,
      });
    }
  };
