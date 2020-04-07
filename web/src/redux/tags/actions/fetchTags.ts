import { push } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    decrypt,
    formatGraphqlErrors,
    getApi,
    GetCurrentUserTagsQuery,
    GetCurrentUserTagsQueryVariables,
} from '../../../helpers';
import { SharedActions } from '../../shared';

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

    const api = getApi();
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
        dispatch({
            type: 'GET_CURRENT_USER_TAGS_FAILURE',
            error,
            isFetching: false,
        });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('[deleteTag] Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.log(error);
    }
};
