import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { localStorageKeys } from '../../../config';
import { enqueueSnackbar } from '../../notifier/actions/enqueueSnackbar';
import { SharedActions } from '../../shared';

export interface CurrentUserActionSetAesPassphrase {
    type: 'SET_AES_PASSPHRASE';
    user: { aesPassphrase: string };
}

export type AesPassphraseAction =
    | CurrentUserActionSetAesPassphrase
    | SharedActions;

export const setAesPassphrase = (
    aesPassphrase: string,
    shouldSaveToLocalstorage: boolean,
) => async (
    dispatch: ThunkDispatch<{}, {}, AesPassphraseAction>,
    getState: () => RootState,
) => {
    const state = getState();
    const isDifferent =
        state.currentUser.aesPassphrase &&
        state.currentUser.aesPassphrase !== aesPassphrase;
    if (isDifferent) {
        if (
            !window.confirm('Are you sure you want to change your passphrase?')
        ) {
            return;
        }
    }
    dispatch({ type: 'SET_AES_PASSPHRASE', user: { aesPassphrase } });
    if (shouldSaveToLocalstorage) {
        localStorage.setItem(localStorageKeys.aesPassphrase, aesPassphrase);
    }
    dispatch(
        enqueueSnackbar({
            message: 'AES Passphrase updated',
            options: { variant: 'success' },
        }),
    );
    if (isDifferent) {
        setTimeout(() => window.location.reload(), 0);
    }
};
