import { ResendConfirmEmailAction, UpdateEmailAction } from '../actions';
import { SharedActions } from '../shared';

interface LoadingOrError {
    loading: boolean;
    error?: string;
}

export interface AppState {
    loading: boolean;
    updateEmail: LoadingOrError;
    resendEmail: LoadingOrError;
}

const defaultState: AppState = {
    loading: false,
    updateEmail: {
        loading: false,
    },
    resendEmail: {
        loading: false,
    },
};

export const appState = (
    state: AppState = defaultState,
    action: SharedActions | UpdateEmailAction | ResendConfirmEmailAction,
): AppState => {
    switch (action.type) {
        case 'SIGN_OUT_SUCCESS':
            return defaultState;
        case 'APP_LOADING':
            return { ...state, loading: action.loading };
        case 'UPDATE_EMAIL_REQUEST':
            return Object.assign({}, state, {
                updateEmail: { ...state.updateEmail, loading: true },
            });
        case 'UPDATE_EMAIL_SUCCESS':
            return Object.assign({}, state, {
                updateEmail: { ...state.updateEmail, loading: false },
            });
        case 'RESEND_EMAIL_REQUEST':
            return Object.assign({}, state, {
                resendEmail: { ...state.resendEmail, loading: true },
            });
        case 'RESEND_EMAIL_SUCCESS':
            return Object.assign({}, state, {
                resendEmail: { ...state.resendEmail, loading: false },
            });
        default:
            return state;
    }
};
