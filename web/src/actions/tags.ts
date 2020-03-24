import CryptoJS from 'crypto-js';
import { ThunkDispatch } from 'redux-thunk';
import {
    getApi,
    CreateTagInput,
    CreateTagMutation,
    decrypt,
    encrypt,
    GetCurrentUserTagsQuery,
    GetCurrentUserTagsQueryVariables,
    MutationCreateTagArgs,
    MutationDeleteTagArgs,
    UpdateTagInput,
    UpdateTagMutation,
    MutationUpdateTagArgs,
} from '../helpers';
import { RootState } from '../reducers';
import { push } from 'connected-react-router';
import { routerUri } from '../config';
import { SharedActions } from './shared';
import { enqueueSnackbar } from './notifier';

export interface GetTagsActionFetching {
    type: 'GET_CURRENT_USER_TAGS_REQUEST';
    isFetching: true;
}

export interface GetTagsActionSuccess {
    type: 'GET_CURRENT_USER_TAGS_SUCCESS';
    tags: GetCurrentUserTagsQuery['currentUserTags'];
    aesPassphrase?: string;
    isFetching: false;
}

export interface GetTagsActionFailure {
    type: 'GET_CURRENT_USER_TAGS_FAILURE';
    error: string;
    isFetching: false;
}

export type GetTagsAction =
    | SharedActions
    | GetTagsActionFetching
    | GetTagsActionSuccess
    | GetTagsActionFailure;

export interface CreateTagsActionFetching {
    type: 'CREATE_TAGS_REQUEST';
    tag: CreateTagInput;
    transactionId: string;
}

export interface CreateTagsActionSuccess {
    type: 'CREATE_TAGS_SUCCESS';
    tag: CreateTagMutation['createTag'];
    transactionId: string;
}

export interface CreateTagsActionFailure {
    type: 'CREATE_TAGS_FAILURE';
    error: string;
    transactionId: string;
}

export type CreateTagsAction =
    | SharedActions
    | CreateTagsActionFetching
    | CreateTagsActionSuccess
    | CreateTagsActionFailure;

export interface UpdateTagsActionFetching {
    type: 'UPDATE_TAGS_REQUEST';
    tag: UpdateTagInput;
    transactionId: string;
}

export interface UpdateTagsActionSuccess {
    type: 'UPDATE_TAGS_SUCCESS';
    tag: UpdateTagMutation['updateTag'];
    transactionId: string;
}

export interface UpdateTagsActionFailure {
    type: 'UPDATE_TAGS_FAILURE';
    error: string;
    transactionId: string;
}

export type UpdateTagsAction =
    | SharedActions
    | UpdateTagsActionFetching
    | UpdateTagsActionSuccess
    | UpdateTagsActionFailure;

export interface DeleteTagsActionFetching {
    type: 'DELETE_TAGS_REQUEST';
    id: string;
    transactionId: string;
}

export interface DeleteTagsActionSuccess {
    type: 'DELETE_TAGS_SUCCESS';
    id: string;
    transactionId: string;
}

export interface DeleteTagsActionFailure {
    type: 'DELETE_TAGS_FAILURE';
    error: string;
    transactionId: string;
}

export type DeleteTagsAction =
    | SharedActions
    | DeleteTagsActionFetching
    | DeleteTagsActionSuccess
    | DeleteTagsActionFailure;

export type TagsAction =
    | GetTagsAction
    | CreateTagsAction
    | DeleteTagsAction
    | UpdateTagsAction;

interface FetchCurrentUserTagsOptions {
    variables: GetCurrentUserTagsQueryVariables;
    forceReload: boolean;
}

export const fetchCurrentUserTags = (
    options?: FetchCurrentUserTagsOptions,
) => async (
    dispatch: ThunkDispatch<{}, {}, GetTagsAction>,
    getState: () => RootState,
    ) => {
        const state = getState();
        const token = state.currentUser.token;
        if (!token) {
            dispatch(push(routerUri.signIn));
            return;
        }
        const api = getApi({ token });
        const { aesPassphrase } = state.currentUser;

        if (!options?.forceReload) {
            if (
                state.currentUserTags.isFetching ||
                state.currentUserTags.fetched ||
                state.currentUserTags.error
            ) {
                return;
            }
        }

        dispatch({
            type: 'GET_CURRENT_USER_TAGS_REQUEST',
            isFetching: true,
        });
        try {
            const { currentUserTags } = await api.getCurrentUserTags(
                options?.variables,
            );
            if (!currentUserTags) {
                return dispatch({
                    type: 'GET_CURRENT_USER_TAGS_FAILURE',
                    error: 'No user returned',
                    isFetching: false,
                });
            }
            dispatch({
                type: 'GET_CURRENT_USER_TAGS_SUCCESS',
                tags: currentUserTags.map(tag => ({
                    ...tag,
                    label: aesPassphrase
                        ? decrypt(tag.label, aesPassphrase)
                        : tag.label,
                })),
                aesPassphrase: state.currentUser.aesPassphrase,
                isFetching: false,
            });
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'GET_CURRENT_USER_TAGS_FAILURE',
                error,
                isFetching: false,
            });
        }
    };

export const createTag = (variables: MutationCreateTagArgs) => async (
    dispatch: ThunkDispatch<{}, {}, CreateTagsAction>,
    getState: () => RootState,
) => {
    const state = getState();
    const token = state.currentUser.token;
    if (!token) {
        dispatch(push(routerUri.signIn));
        return;
    }
    const api = getApi({ token });
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
        dispatch(enqueueSnackbar({ message: 'Tag created', options: { variant: 'success' } }));
    } catch (error) {
        console.error(error);
        dispatch({
            type: 'CREATE_TAGS_FAILURE',
            error,
            transactionId,
        });
        dispatch(enqueueSnackbar({ message: 'Error creating tag', options: { variant: 'error' } }));
    }
};

export const updateTag = (variables: MutationUpdateTagArgs) => async (
    dispatch: ThunkDispatch<{}, {}, UpdateTagsAction>,
    getState: () => RootState,
) => {
    const state = getState();
    const token = state.currentUser.token;
    if (!token) {
        dispatch(push(routerUri.signIn));
        return;
    }
    const api = getApi({ token });
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
        console.error(error);
        dispatch({
            type: 'UPDATE_TAGS_FAILURE',
            error,
            transactionId,
        });
    }
};

export const deleteTag = (variables: MutationDeleteTagArgs) => async (
    dispatch: ThunkDispatch<{}, {}, DeleteTagsAction>,
    getState: () => RootState,
) => {
    const state = getState();
    const token = state.currentUser.token;
    if (!token) {
        dispatch(push(routerUri.signIn));
        return;
    }
    const api = getApi({ token });
    const transactionId =
        new Date().valueOf().toString() +
        '-' +
        CryptoJS.lib.WordArray.random(128 / 8).toString();

    dispatch({
        type: 'DELETE_TAGS_REQUEST',
        id: variables.id,
        transactionId,
    });

    try {
        const { deleteTag } = await api.deleteTag({ id: variables.id });
        dispatch(
            enqueueSnackbar({
                message: 'Tag deleted',
                options: { variant: 'success' },
            }),
        );
        dispatch({
            type: 'DELETE_TAGS_SUCCESS',
            id: deleteTag.id,
            transactionId,
        });
    } catch (error) {
        console.error(error);
        dispatch(
            enqueueSnackbar({
                message: 'Error deleting tag...',
                options: { variant: 'error' },
            }),
        );
        dispatch({
            type: 'DELETE_TAGS_FAILURE',
            error,
            transactionId,
        });
    }
};
