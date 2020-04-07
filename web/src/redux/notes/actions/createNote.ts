import { push } from 'connected-react-router';
import CryptoJS from 'crypto-js';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    CreateNoteMutation,
    CreateNoteMutationVariables,
    decrypt,
    encrypt,
    formatGraphqlErrors,
    getApi,
} from '../../../helpers';
import { enqueueSnackbar } from '../../notifier/actions/enqueueSnackbar';
import { SharedActions } from '../../shared';

export interface CreateNotesActionFetching {
    type: 'CREATE_NOTE_REQUEST';
    note: CreateNoteMutationVariables['input'];
    transactionId: string;
}

export interface CreateNotesActionSuccess {
    type: 'CREATE_NOTE_SUCCESS';
    note: CreateNoteMutation['createNote'];
    transactionId: string;
}

export interface CreateNotesActionError {
    type: 'CREATE_NOTE_FAILURE';
    error: string;
    transactionId: string;
}

export type CreateNoteAction =
    | SharedActions
    | CreateNotesActionFetching
    | CreateNotesActionSuccess
    | CreateNotesActionError;

export const createNote = (
    note: CreateNoteMutationVariables['input'],
) => async (
    dispatch: ThunkDispatch<{}, {}, CreateNoteAction>,
    getState: () => RootState,
) => {
    const state = getState();

    const api = getApi();
    const transactionId =
        new Date().valueOf().toString() +
        '-' +
        CryptoJS.lib.WordArray.random(128 / 8).toString();

    dispatch({ type: 'CREATE_NOTE_REQUEST', note, transactionId });
    const { aesPassphrase } = state.currentUser;
    if (!aesPassphrase) {
        dispatch({
            type: 'CREATE_NOTE_FAILURE',
            transactionId,
            error: 'No aes passphrase in state',
        });
        return;
    }
    try {
        const { createNote } = await api.createNote({
            input: {
                ...note,
                text: encrypt(note.text, aesPassphrase),
                tags: note.tags.map(tag => ({ id: tag.id })),
            },
        });
        dispatch({
            type: 'CREATE_NOTE_SUCCESS',
            note: {
                ...createNote,
                text: decrypt(createNote.text, aesPassphrase),
            },
            transactionId,
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_NOTE_FAILURE',
            transactionId,
            error,
        });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.log(error);
        dispatch(
            enqueueSnackbar({
                message: 'Error creating note',
                options: { variant: 'error' },
            }),
        );
    }
};
