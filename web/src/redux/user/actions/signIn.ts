import { push } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import { getApi, MutationSignInArgs } from '../../../helpers';
import { SharedActions } from '../../shared';

export interface SignInActionFetching {
    type: 'SIGN_IN_REQUEST';
}

export interface SignInActionSuccess {
    type: 'SIGN_IN_SUCCESS';
    token: string;
    demo?: boolean;
}

export interface SignInActionFailure {
    type: 'SIGN_IN_FAILURE';
    error: string;
}

export type SignInAction =
    | SharedActions
    | SignInActionFetching
    | SignInActionSuccess
    | SignInActionFailure;

export const signIn = (
    variables: MutationSignInArgs['input'],
    demo?: boolean,
): ThunkAction<Promise<void>, RootState, {}, SignInAction> => async (
    dispatch,
    getState,
) => {
    console.debug('action.signIn', { variables });
    const api = getApi();
    dispatch({ type: 'SIGN_IN_REQUEST' });
    try {
        const { signIn: token } = await api.signIn({ input: variables });
        if (!token) {
            dispatch({
                type: 'SIGN_IN_FAILURE',
                error: 'Wrong username or password',
            });
            return;
        }
        dispatch({ type: 'SIGN_IN_SUCCESS', token, demo });
        console.debug('Signed In. Redirecting to /notes');
        dispatch(push(routerUri.notes));
    } catch (error) {
        console.error(error);
        dispatch({
            type: 'SIGN_IN_FAILURE',
            error: 'Wrong username or password',
        });
    }
};
