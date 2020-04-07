import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { removeSnackbar } from '../redux/actions';

let displayed: string[] = [];

export const Notifier = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(
        (state: RootState) => state.notifier.notifications || [],
    );
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const storeDisplayed = (id: string) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id: string) => {
        displayed = [...displayed.filter(key => id !== key)];
    };

    React.useEffect(() => {
        notifications.forEach(
            ({ key, message, options = {}, dismissed = false }) => {
                if (dismissed) {
                    // dismiss snackbar using notistack
                    closeSnackbar(key);
                    return;
                }

                // do nothing if snackbar is already displayed
                if (displayed.includes(key)) return;

                // display snackbar using notistack
                enqueueSnackbar(message, {
                    key,
                    ...options,
                    onClose: (event, reason, myKey) => {
                        if (options.onClose) {
                            options.onClose(event, reason, myKey);
                        }
                    },
                    onExited: (event, myKey: string) => {
                        // removen this snackbar from redux store
                        dispatch(removeSnackbar(myKey));
                        removeDisplayed(myKey);
                    },
                });

                // keep track of snackbars that we've displayed
                storeDisplayed(key);
            },
        );
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

    return null;
};

export default Notifier;
