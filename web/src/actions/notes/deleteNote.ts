import { ThunkDispatch } from 'redux-thunk';
import { api } from '../../helpers';

export interface DeleteNotesActionFetching {
  type: 'DELETE_NOTE_REQUEST';
  id: string;
}

export interface DeleteNotesActionSuccess {
  type: 'DELETE_NOTE_SUCCESS';
  id: string;
}

export interface DeleteNotesActionError {
  type: 'DELETE_NOTE_FAILURE';
  id: string;
  error: string;
}

export type DeleteNoteAction =
  | DeleteNotesActionFetching
  | DeleteNotesActionSuccess
  | DeleteNotesActionError;

export const deleteNote = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, DeleteNoteAction>,
) => {
  dispatch({ type: 'DELETE_NOTE_REQUEST', id });
  try {
    const { deleteNote } = await api.deleteNote({ id });
    dispatch({
      type: 'DELETE_NOTE_SUCCESS',
      id: deleteNote.id,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'DELETE_NOTE_FAILURE',
      id,
      error,
    });
  }
};
