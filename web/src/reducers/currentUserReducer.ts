import { UserAction } from '../actions';
import { User } from '../helpers/';

interface CurrentUserState {
  user?: User;
  aesPassphrase?: string;
  isFetching: boolean;
  error?: string;
  fetched: boolean;
}

const defaultState: CurrentUserState = { isFetching: false, fetched: false };

export const currentUser = (
  state: CurrentUserState = defaultState,
  action: UserAction,
): CurrentUserState => {
  switch (action.type) {
    case 'GET_CURRENT_USER_REQUEST':
      return { ...state, ...action, isFetching: true };
    case 'GET_CURRENT_USER_SUCCESS':
      return { ...state, ...action, fetched: true, isFetching: false };
    case 'GET_CURRENT_USER_FAILURE':
      return { ...state, ...action, fetched: true, isFetching: false };
    case 'SET_AES_PASSPHRASE':
      return { ...state, aesPassphrase: action.user.aesPassphrase };
    default:
      return state;
  }
};
