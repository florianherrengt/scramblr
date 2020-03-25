import * as Notistack from 'notistack';

type EnqueueSnackbarAction = {
    type: 'ENQUEUE_SNACKBAR';
    notification: any;
};

type CloseSnackbarAction = {
    type: 'CLOSE_SNACKBAR';
    dismissAll: boolean;
    key?: string;
};

type RemoveSnackbarAction = {
    type: 'REMOVE_SNACKBAR';
    key: string;
};

export type NotifierActions =
    | EnqueueSnackbarAction
    | CloseSnackbarAction
    | RemoveSnackbarAction;

interface EnqueueSnackbarOptions {
    key?: string;
    message: string;
    options?: Notistack.OptionsObject;
}

export const enqueueSnackbar = (
    notification: EnqueueSnackbarOptions,
): EnqueueSnackbarAction => {
    if (notification.options?.variant === 'success') {
        notification.options.autoHideDuration =
            notification.options.autoHideDuration || 2000;
    }
    return {
        type: 'ENQUEUE_SNACKBAR',
        notification: {
            ...notification,
            key: notification.key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = (key?: string): CloseSnackbarAction => ({
    type: 'CLOSE_SNACKBAR',
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = (key: string): RemoveSnackbarAction => ({
    type: 'REMOVE_SNACKBAR',
    key,
});
