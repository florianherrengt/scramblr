import { push, RouterAction } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import { getApi, MutationSignUpArgs } from '../../../helpers';

export interface SignUpActionFetching {
    type: 'SIGN_IN_REQUEST';
}

export interface SignUpActionSuccess {
    type: 'SIGN_IN_SUCCESS';
    token: string;
    demo?: boolean;
}

export interface SignUpActionFailure {
    type: 'SIGN_IN_FAILURE';
    error: string;
}

export type SignUpAction =
    | RouterAction
    | SignUpActionFetching
    | SignUpActionSuccess
    | SignUpActionFailure;

export const signUp = (
    variables: MutationSignUpArgs['input'],
    demo?: boolean,
): ThunkAction<Promise<void>, RootState, {}, SignUpAction> => async (
    dispatch,
    getState,
) => {
    const api = getApi();
    dispatch({ type: 'SIGN_IN_REQUEST' });
    try {
        const { signUp: token } = await api.signUp({ input: variables });
        dispatch({ type: 'SIGN_IN_SUCCESS', token });
        console.debug('Signed In. Redirecting to /notes');
        dispatch(push(routerUri.notes));
    } catch (error) {
        console.log(error);
    }
};
