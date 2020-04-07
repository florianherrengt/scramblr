import { push } from 'connected-react-router';
import CryptoJS from 'crypto-js';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    decrypt,
    encrypt,
    formatGraphqlErrors,
    getApi,
    UpdateNoteMutation,
    UpdateNoteMutationVariables,
} from '../../../helpers';
import { enqueueSnackbar } from '../../notifier/actions/enqueueSnackbar';
import { SharedActions } from '../../shared';

export interface UpdateNotesActionFetching {
    type: 'UPDATE_NOTE_REQUEST';
    note: UpdateNoteMutationVariables['input'];
    transactionId: string;
}

export interface UpdateNotesActionSuccess {
    type: 'UPDATE_NOTE_SUCCESS';
    note: UpdateNoteMutation['updateNote'];
    transactionId: string;
}

export interface UpdateNotesActionError {
    type: 'UPDATE_NOTE_FAILURE';
    error: string;
    transactionId: string;
}

export type UpdateNoteAction =
    | SharedActions
    | UpdateNotesActionFetching
    | UpdateNotesActionSuccess
    | UpdateNotesActionError;

export const updateNote = (
    note: UpdateNoteMutationVariables['input'],
) => async (
    dispatch: ThunkDispatch<{}, {}, UpdateNoteAction>,
    getState: () => RootState,
) => {
    const state = getState();
    const api = getApi();
    const transactionId =
        new Date().valueOf().toString() +
        '-' +
        CryptoJS.lib.WordArray.random(128 / 8).toString();

    dispatch({ type: 'UPDATE_NOTE_REQUEST', note, transactionId });
    const { aesPassphrase } = state.currentUser;
    if (!aesPassphrase) {
        dispatch({
            type: 'UPDATE_NOTE_FAILURE',
            transactionId,
            error: 'No aes passphrase in state',
        });
        return;
    }
    try {
        const { updateNote } = await api.updateNote({
            input: Object.assign(
                {},
                note,
                note.text && { text: encrypt(note.text, aesPassphrase) },
                note.tags && { tags: note.tags.map(tag => ({ id: tag.id })) },
            ),
        });
        dispatch(
            enqueueSnackbar({
                message: 'Note updated',
                options: { variant: 'success' },
            }),
        );
        dispatch({
            type: 'UPDATE_NOTE_SUCCESS',
            note: {
                ...updateNote,
                text: decrypt(updateNote.text, aesPassphrase),
            },
            transactionId,
        });
    } catch (error) {
        dispatch({
            type: 'UPDATE_NOTE_FAILURE',
            transactionId,
            error,
        });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.error(error);
        dispatch(
            enqueueSnackbar({
                message: 'Error updating note',
                options: { variant: 'error' },
            }),
        );
    }
};
