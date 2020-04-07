import * as Notistack from 'notistack';
import { NotifierActions } from '../actions';
import { SharedActions } from '../shared';

export interface SnackNotification {
    key: string;
    message: string;
    options?: Notistack.OptionsObject;
}

export interface NotifierState {
    notifications: SnackNotification[];
}

const defaultState: NotifierState = {
    notifications: [],
};

export const notifier = (
    state = defaultState,
    action: NotifierActions | SharedActions,
) => {
    switch (action.type) {
        case 'SIGN_OUT_SUCCESS':
            return defaultState;

        case 'ENQUEUE_SNACKBAR':
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        ...action.notification,
                    },
                ],
            };

        case 'CLOSE_SNACKBAR':
            return {
                ...state,
                notifications: state.notifications.map(notification =>
                    action.dismissAll || notification.key === action.key
                        ? { ...notification, dismissed: true }
                        : { ...notification },
                ),
            };

        case 'REMOVE_SNACKBAR':
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };

        default:
            return state;
    }
};
