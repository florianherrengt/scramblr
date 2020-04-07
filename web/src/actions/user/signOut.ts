import { push } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { localStorageKeys, routerUri } from '../../config';
import { getApi } from '../../helpers';
import { RootState } from '../../reducers';
import { enqueueSnackbar } from '../notifier';
import { SharedActions } from '../shared';

export interface SignOutActionSuccess {
    type: 'SIGN_OUT_SUCCESS';
}

export type SignOutAction = SharedActions | SignOutActionSuccess;

export const signOut = (): ThunkAction<
    Promise<void>,
    RootState,
    {},
    SignOutAction
> => async (dispatch, getState) => {
    const api = getApi();
    try {
        localStorage.removeItem(localStorageKeys.aesPassphrase);
        await api.signOut();
        dispatch({ type: 'SIGN_OUT_SUCCESS' });
        dispatch({ type: 'SIGN_OUT_SUCCESS' });
        dispatch(push(routerUri.signIn));
    } catch (error) {
        console.error(error);
        dispatch(
            enqueueSnackbar({
                message: 'Error signing out',
                options: { variant: 'error' },
            }),
        );
    }
};
