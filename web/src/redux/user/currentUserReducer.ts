import { User } from '../../helpers';
import { UserAction } from '../actions';

interface CurrentUserState {
    user?: User;
    token?: string;
    aesPassphrase?: string;
    isFetching: boolean;
    error?: string;
    fetched: boolean;
    demo?: boolean;
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
            return {
                ...state,
                token: action.token,
                fetched: true,
                isFetching: false,
                error: '',
                demo: action.demo,
            };
        case 'SIGN_IN_FAILURE':
            return {
                ...state,
                fetched: true,
                isFetching: false,
                error: action.error,
            };
        case 'SIGN_OUT_SUCCESS':
            return defaultState;
        default:
            return state;
    }
};
