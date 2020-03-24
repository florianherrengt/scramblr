import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { User, MutationSignInArgs, MutationSignUpArgs, getApi } from '../../helpers';
import { RootState } from '../../reducers';
import { localStorageKeys, routerUri } from '../../config';
import { push, RouterAction } from 'connected-react-router';
import { fetchCurrentUser } from './user';
import { fetchCurrentUserNotes } from '../notes';
import { fetchCurrentUserTags } from '../tags';

export interface SignInActionFetching {
    type: 'SIGN_IN_REQUEST';
}

export interface SignInActionSuccess {
    type: 'SIGN_IN_SUCCESS';
    token: string
}

export interface SignInActionFailure {
    type: 'SIGN_IN_FAILURE';
    error: string
}

export type SignInAction =
    | RouterAction
    | SignInActionFetching
    | SignInActionSuccess
    | SignInActionFailure;

export const signIn = (variables: MutationSignInArgs['input']): ThunkAction<Promise<void>, RootState, {}, SignInAction> => async (
    dispatch,
    getState,
) => {
    const api = getApi()
    dispatch({ type: 'SIGN_IN_REQUEST' })
    try {
        const { signIn: token } = await api.signIn({ input: variables });
        if (!token) {
            dispatch({ type: 'SIGN_IN_FAILURE', error: 'Wrong username or password' })
            return
        }
        dispatch({ type: 'SIGN_IN_SUCCESS', token })

        dispatch(push(routerUri.notes))
        dispatch(fetchCurrentUser())
        dispatch(fetchCurrentUserNotes())
        dispatch(fetchCurrentUserTags())
    } catch (error) {
        dispatch({ type: 'SIGN_IN_FAILURE', error: 'Wrong username or password' })
    }
};