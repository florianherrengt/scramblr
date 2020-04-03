import { SharedActions } from '../actions/shared';
import { UpdateEmailAction, ResendConfirmEmailAction } from '../actions';

interface LoadingOrError {
    loading: boolean;
    error?: string;
}

export interface AppState {
    updateEmail: LoadingOrError;
    resendEmail: LoadingOrError;
}

const defaultState: AppState = {
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
