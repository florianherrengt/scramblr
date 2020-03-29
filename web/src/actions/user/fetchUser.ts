import { push } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';
import { routerUri } from '../../config';
import { formatGraphqlErrors, getApi, User } from '../../helpers';
import { RootState } from '../../reducers';
import { SharedActions } from '../shared';

export interface GetCurrentUserActionFetching {
    type: 'GET_CURRENT_USER_REQUEST';
}

export interface GetCurrentUserActionSuccess {
    type: 'GET_CURRENT_USER_SUCCESS';
    user: User;
}

export interface GetCurrentUserActionFailure {
    type: 'GET_CURRENT_USER_FAILURE';
}

export type GetCurrentUserAction =
    | SharedActions
    | GetCurrentUserActionFetching
    | GetCurrentUserActionSuccess
    | GetCurrentUserActionFailure;

export const fetchCurrentUser = (options?: { forceReload: boolean }) => async (
    dispatch: ThunkDispatch<{}, {}, GetCurrentUserAction>,
    getState: () => RootState,
) => {
    const state = getState();

    const api = getApi();
    if (!options?.forceReload) {
        if (
            state.currentUser.isFetching ||
            state.currentUser.user ||
            state.currentUser.error
        ) {
            return;
        }
    }
    dispatch({
        type: 'GET_CURRENT_USER_REQUEST',
    });
    try {
        const { currentUser } = await api.getCurrentUser();
        if (!currentUser) {
            return dispatch({
                type: 'GET_CURRENT_USER_FAILURE',
            });
        }
        dispatch({
            type: 'GET_CURRENT_USER_SUCCESS',
            user: currentUser,
            isFetching: false,
        });
    } catch (error) {
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch(push(routerUri.signIn));
            return;
        }
        console.error(error);
        dispatch({
            type: 'GET_CURRENT_USER_FAILURE',
        });
    }
};
