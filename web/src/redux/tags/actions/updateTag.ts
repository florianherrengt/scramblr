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
    MutationUpdateTagArgs,
    UpdateTagInput,
    UpdateTagMutation,
} from '../../../helpers';
import { enqueueSnackbar } from '../../notifier/actions/enqueueSnackbar';
import { SharedActions } from '../../shared';

export interface UpdateTagActionFetching {
    type: 'UPDATE_TAGS_REQUEST';
    tag: UpdateTagInput;
    transactionId: string;
}

export interface UpdateTagActionSuccess {
    type: 'UPDATE_TAGS_SUCCESS';
    tag: UpdateTagMutation['updateTag'];
    transactionId: string;
}

export interface UpdateTagActionFailure {
    type: 'UPDATE_TAGS_FAILURE';
    error: string;
    transactionId: string;
}

export type UpdateTagAction =
    | SharedActions
    | UpdateTagActionFetching
    | UpdateTagActionSuccess
    | UpdateTagActionFailure;

export const updateTag = (variables: MutationUpdateTagArgs) => async (
    dispatch: ThunkDispatch<{}, {}, UpdateTagAction>,
    getState: () => RootState,
) => {
    const state = getState();

    const api = getApi();
    const { aesPassphrase } = state.currentUser;
    const transactionId =
        new Date().valueOf().toString() +
        '-' +
        CryptoJS.lib.WordArray.random(128 / 8).toString();

    dispatch({
        type: 'UPDATE_TAGS_REQUEST',
        tag: variables.input,
        transactionId,
    });

    if (!aesPassphrase) {
        console.error('No AES Passphrase');
        dispatch({
            type: 'UPDATE_TAGS_FAILURE',
            error: 'No AES Passphrase',
            transactionId,
        });
        return;
    }

    const input = {
        ...variables.input,
        label: encrypt(variables.input.label, aesPassphrase),
    };
    try {
        const { updateTag } = await api.updateTag({ input });
        dispatch(
            enqueueSnackbar({
                message: 'Tag updated',
                options: { variant: 'success' },
            }),
        );
        dispatch({
            type: 'UPDATE_TAGS_SUCCESS',
            tag: {
                ...updateTag,
                label: decrypt(updateTag.label, aesPassphrase),
            },
            transactionId,
        });
    } catch (error) {
        dispatch({
            type: 'UPDATE_TAGS_FAILURE',
            error,
            transactionId,
        });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('[updateTag] Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.log(error);
    }
};
