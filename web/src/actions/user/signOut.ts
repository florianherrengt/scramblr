import { push, RouterAction } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { routerUri, localStorageKeys } from '../../config';
import { getApi, MutationSignInArgs } from '../../helpers';
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
        await api.signOut();
        localStorage.removeItem(localStorageKeys.aesPassphrase);
        dispatch({ type: 'SIGN_OUT_SUCCESS' });
        console.debug('Unauthenticated. Redirect to sign in');
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
