import { ThunkDispatch } from 'redux-thunk';
import { api, User, MutationSignInArgs, MutationSignUpArgs } from '../helpers';
import { RootState } from '../reducers';
import { localStorageKeys, routerUri } from '../config';

export interface GetCurrentUserActionFetching {
  type: 'GET_CURRENT_USER_REQUEST';
  isFetching: true;
}

export interface GetCurrentUserActionSuccess {
  type: 'GET_CURRENT_USER_SUCCESS';
  user: User;
  isFetching: false;
}

export interface GetCurrentUserActionFailure {
  type: 'GET_CURRENT_USER_FAILURE';
  error: string;
  isFetching: false;
}

export interface CurrentUserActionSetAesPassphrase {
  type: 'SET_AES_PASSPHRASE';
  user: { aesPassphrase: string };
}

export type GetCurrentUserAction =
  | GetCurrentUserActionFetching
  | GetCurrentUserActionSuccess
  | GetCurrentUserActionFailure;

export type UserAction =
  | GetCurrentUserAction
  | CurrentUserActionSetAesPassphrase;

export const fetchCurrentUser = (options?: { forceReload: boolean }) => async (
  dispatch: ThunkDispatch<{}, {}, GetCurrentUserAction>,
  getState: () => RootState,
) => {
  if (!options?.forceReload) {
    const state = getState();
    if (
      state.currentUser.isFetching ||
      state.currentUser.user ||
      state.currentUser.error
    ) {
      return;
    }
  }
  dispatch({
    type: 'GET_CURRENT_USER_REQUEST',
    isFetching: true,
  });
  try {
    const { currentUser } = await api.getCurrentUser();
    if (!currentUser) {
      return dispatch({
        type: 'GET_CURRENT_USER_FAILURE',
        error: 'No user returned',
        isFetching: false,
      });
    }
    dispatch({
      type: 'GET_CURRENT_USER_SUCCESS',
      user: currentUser,
      isFetching: false,
    });
  } catch (error) {
    dispatch({
      type: 'GET_CURRENT_USER_FAILURE',
      error,
      isFetching: false,
    });
  }
};

export const setAesPassphrase = (
  aesPassphrase: string,
  shouldSaveToLocalstorage: boolean,
) => async (
  dispatch: ThunkDispatch<{}, {}, CurrentUserActionSetAesPassphrase>,
  getState: () => RootState,
) => {
  dispatch({ type: 'SET_AES_PASSPHRASE', user: { aesPassphrase } });
  if (shouldSaveToLocalstorage) {
    localStorage.setItem(localStorageKeys.aesPassphrase, aesPassphrase);
  }
};

export const signIn = async (variables: MutationSignInArgs['input']) => {
  const { signIn: token } = await api.signIn({ input: variables });
  if (token) {
    localStorage.setItem(localStorageKeys.token, token);
  }
  window.location.replace(routerUri.notes);
};

export const signUp = async (variables: MutationSignUpArgs['input']) => {
  const { signUp: token } = await api.signUp({ input: variables });
  if (token) {
    localStorage.setItem(localStorageKeys.token, token);
  }
  window.location.replace(routerUri.notes);
};
