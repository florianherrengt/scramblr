import CryptoJS from 'crypto-js';
import { ThunkDispatch } from 'redux-thunk';
import {
    api,
    UpdateNoteMutation,
    UpdateNoteMutationVariables,
    decrypt,
    encrypt,
} from '../../helpers';
import { RootState } from '../../reducers';


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
                input: Object.assign({}, note, note.text && { text: encrypt(note.text, aesPassphrase) }, note.tags && { tags: note.tags.map(tag => ({ id: tag.id })) })
            });
            dispatch({
                type: 'UPDATE_NOTE_SUCCESS',
                note: { ...updateNote, text: decrypt(updateNote.text, aesPassphrase) },
                transactionId,
            });
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'UPDATE_NOTE_FAILURE',
                transactionId,
                error,
            });
        }
    };
