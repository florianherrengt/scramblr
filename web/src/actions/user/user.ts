import { push, RouterAction } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';
import { localStorageKeys, routerUri } from '../../config';
import { getApi, MutationSignUpArgs, User } from '../../helpers';
import { RootState } from '../../reducers';
import { enqueueSnackbar } from '../notifier';
import { SharedActions } from '../shared';

export interface GetCurrentUserActionFetching {
    type: 'GET_CURRENT_USER_REQUEST';
    isFetching: true;
}

export interface GetCurrentUserActionSuccess {
    type: 'GET_CURRENT_USER_SUCCESS';
    user: User;
    isFetching: false;
}

export interface GetCurrentUserActionFailure {
    type: 'GET_CURRENT_USER_FAILURE';
    isFetching: false;
}

export interface CurrentUserActionSetAesPassphrase {
    type: 'SET_AES_PASSPHRASE';
    user: { aesPassphrase: string };
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
    const token = state.currentUser.token;

    if (!token) {
        console.debug('Undefined token. Redirecting to /sign-in')
        dispatch(push(routerUri.signIn));
        return;
    }
    const api = getApi({ token });
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
        isFetching: true,
    });
    try {
        const { currentUser } = await api.getCurrentUser();
        if (!currentUser) {
            return dispatch({
                type: 'GET_CURRENT_USER_FAILURE',
                isFetching: false,
            });
        }
        dispatch({
            type: 'GET_CURRENT_USER_SUCCESS',
            user: currentUser,
            isFetching: false,
        });
    } catch (error) {
        dispatch({
            type: 'GET_CURRENT_USER_FAILURE',
            isFetching: false,
        });
    }
};

export const setAesPassphrase = (
    aesPassphrase: string,
    shouldSaveToLocalstorage: boolean,
) => async (
    dispatch: ThunkDispatch<{}, {}, CurrentUserActionSetAesPassphrase | SharedActions>,
    getState: () => RootState,
    ) => {
        const state = getState()
        const isDifferent = state.currentUser.aesPassphrase !== aesPassphrase
        if (isDifferent) {
            if (!window.confirm('Are you sure you want to change your passphrase?')) {
                return
            }
        }
        dispatch({ type: 'SET_AES_PASSPHRASE', user: { aesPassphrase } });
        if (shouldSaveToLocalstorage) {
            localStorage.setItem(localStorageKeys.aesPassphrase, aesPassphrase);
        }
        dispatch(enqueueSnackbar({
            message: 'AES Passphrase updated',
            options: { variant: 'success' }
        }))
        if (isDifferent) {
            setTimeout(() => window.location.reload(), 0)
        }
    };

export const signUp = async (variables: MutationSignUpArgs['input']) => {
    // const { signUp: token } = await api.signUp({ input: variables });
    // if (token) {
    //     localStorage.setItem(localStorageKeys.token, token);
    // }
    // window.location.replace(routerUri.notes);
};