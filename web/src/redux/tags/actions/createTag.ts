import { push } from 'connected-react-router';
import CryptoJS from 'crypto-js';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    CreateTagInput,
    CreateTagMutation,
    encrypt,
    formatGraphqlErrors,
    getApi,
    MutationCreateTagArgs,
} from '../../../helpers';
import { enqueueSnackbar } from '../../notifier/actions/enqueueSnackbar';
import { SharedActions } from '../../shared';

export interface CreateTagActionFetching {
    type: 'CREATE_TAGS_REQUEST';
    tag: CreateTagInput;
    transactionId: string;
}

export interface CreateTagActionSuccess {
    type: 'CREATE_TAGS_SUCCESS';
    tag: CreateTagMutation['createTag'];
    transactionId: string;
}

export interface CreateTagActionFailure {
    type: 'CREATE_TAGS_FAILURE';
    error: string;
    transactionId: string;
}

export type CreateTagAction =
    | SharedActions
    | CreateTagActionFetching
    | CreateTagActionSuccess
    | CreateTagActionFailure;

export const createTag = (variables: MutationCreateTagArgs) => async (
    dispatch: ThunkDispatch<{}, {}, CreateTagAction>,
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
        type: 'CREATE_TAGS_REQUEST',
        tag: variables.input,
        transactionId,
    });

    if (!aesPassphrase) {
        console.error('No AES Passphrase');

        dispatch({
            type: 'CREATE_TAGS_FAILURE',
            error: 'No AES Passphrase',
            transactionId,
        });
        dispatch(enqueueSnackbar({ message: 'No AES Passphrase' }));
        return;
    }

    try {
        const input = {
            ...variables.input,
            label: encrypt(variables.input.label, aesPassphrase),
        };
        const { createTag } = await api.createTag({ input });

        dispatch({
            type: 'CREATE_TAGS_SUCCESS',
            tag: { ...createTag, label: variables.input.label },
            transactionId,
        });
        dispatch(
            enqueueSnackbar({
                message: 'Tag created',
                options: { variant: 'success' },
            }),
        );
    } catch (error) {
        dispatch({
            type: 'CREATE_TAGS_FAILURE',
            error,
            transactionId,
        });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('[createTag] Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.log(error);

        dispatch(
            enqueueSnackbar({
                message: 'Error creating tag',
                options: { variant: 'error' },
            }),
        );
    }
};
