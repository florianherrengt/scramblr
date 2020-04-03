import { push } from 'connected-react-router';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { routerUri } from '../../config';
import { formatGraphqlErrors, getApi, User } from '../../helpers';
import { RootState } from '../../reducers';
import { SharedActions } from '../shared';
import { ActionCreator } from 'redux';

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

export const fetchCurrentUser: ActionCreator<ThunkAction<
    Promise<GetCurrentUserAction>,
    RootState,
    undefined,
    GetCurrentUserAction
>> = () => async (dispatch, getState) => {
    const api = getApi();

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
        return dispatch({
            type: 'GET_CURRENT_USER_SUCCESS',
            user: currentUser,
            isFetching: false,
        });
    } catch (error) {
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            return dispatch(push(routerUri.signIn));
        }
        console.error(error);
        return dispatch({
            type: 'GET_CURRENT_USER_FAILURE',
        });
    }
};
