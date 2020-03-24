import { UserAction } from '../actions';
import { User } from '../helpers/';
import { localStorageKeys } from '../config';

interface CurrentUserState {
    user?: User;
    token?: string;
    aesPassphrase?: string;
    isFetching: boolean;
    error?: string;
    fetched: boolean;
}

const defaultState: CurrentUserState = { isFetching: false, fetched: false };

export const currentUser = (
    state: CurrentUserState = defaultState,
    action: UserAction,
): CurrentUserState => {
    switch (action.type) {
        case 'GET_CURRENT_USER_REQUEST':
            return { ...state, ...action, isFetching: true, error: '' };
        case 'GET_CURRENT_USER_SUCCESS':
            return {
                ...state,
                ...action,
                fetched: true,
                isFetching: false,
                error: '',
            };
        case 'GET_CURRENT_USER_FAILURE':
            return { ...state, ...action, fetched: true, isFetching: false };
        case 'SET_AES_PASSPHRASE':
            return { ...state, aesPassphrase: action.user.aesPassphrase };
        case 'SIGN_IN_REQUEST':
            return { ...state, isFetching: true, error: '' };
        case 'SIGN_IN_SUCCESS':
            localStorage.setItem(localStorageKeys.token, action.token);
            return {
                ...state,
                token: action.token,
                fetched: true,
                isFetching: false,
                error: '',
            };
        case 'SIGN_IN_FAILURE':
            return {
                ...state,
                fetched: true,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
};
