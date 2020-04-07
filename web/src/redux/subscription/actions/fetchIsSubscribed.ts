import { push } from 'connected-react-router';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import { formatGraphqlErrors, getApi } from '../../../helpers';
import { SharedActions } from '../../shared';

export interface GetIsSubscribedFetching {
    type: 'GET_IS_SUBSCRIBED_REQUEST';
}

export interface GetIsSubscribedSuccess {
    type: 'GET_IS_SUBSCRIBED_SUCCESS';
    isSubscribed: boolean;
}

export interface GetIsSubscribedFailure {
    type: 'GET_IS_SUBSCRIBED_FAILURE';
}

export type GetIsSubscribed =
    | SharedActions
    | GetIsSubscribedFetching
    | GetIsSubscribedSuccess
    | GetIsSubscribedFailure;

export const fetchIsSubscribed: ActionCreator<ThunkAction<
    Promise<GetIsSubscribed>,
    RootState,
    undefined,
    GetIsSubscribed
>> = () => async (dispatch, getState) => {
    const api = getApi();
    try {
        dispatch({
            type: 'GET_IS_SUBSCRIBED_REQUEST',
        });
        const { isSubscribed } = await api.isSubscribed();
        if (!isSubscribed) {
            return dispatch({
                type: 'GET_IS_SUBSCRIBED_FAILURE',
            });
        }
        return dispatch({
            type: 'GET_IS_SUBSCRIBED_SUCCESS',
            isSubscribed: Boolean(parseInt(isSubscribed, 10)),
        });
    } catch (error) {
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
        } else {
            console.error(error);
        }
        return dispatch({
            type: 'GET_IS_SUBSCRIBED_FAILURE',
        });
    }
};
