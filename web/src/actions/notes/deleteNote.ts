import { ThunkDispatch } from 'redux-thunk';
import { getApi } from '../../helpers';
import { RootState } from '../../reducers';
import { push } from 'connected-react-router';
import { routerUri } from '../../config';
import { enqueueSnackbar } from '../notifier';
import { SharedActions } from '../shared';

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
    | SharedActions
    | DeleteNotesActionFetching
    | DeleteNotesActionSuccess
    | DeleteNotesActionError;

export const deleteNote = (id: string) => async (
    dispatch: ThunkDispatch<{}, {}, DeleteNoteAction>,
    getState: () => RootState,
) => {
    const state = getState();

    const token = state.currentUser.token;
    if (!token) {
        dispatch(push(routerUri.signIn));
        return;
    }
    const api = getApi({ token });
    dispatch({ type: 'DELETE_NOTE_REQUEST', id });
    try {
        const { deleteNote } = await api.deleteNote({ id });
        dispatch(
            enqueueSnackbar({
                message: 'Note deleted',
                options: { variant: 'success' },
            }),
        );
        dispatch({
            type: 'DELETE_NOTE_SUCCESS',
            id: deleteNote.id,
        });
    } catch (error) {
        console.error(error);
        dispatch(
            enqueueSnackbar({
                message: 'Error deleting note',
                options: { variant: 'error' },
            }),
        );
        dispatch({
            type: 'DELETE_NOTE_FAILURE',
            id,
            error,
        });
    }
};
