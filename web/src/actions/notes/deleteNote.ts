import { ThunkDispatch } from 'redux-thunk';
import { getApi, formatGraphqlErrors } from '../../helpers';
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
    const api = getApi();
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
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch(push(routerUri.signIn));
            return;
        }
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
