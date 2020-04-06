import { RouterAction } from 'connected-react-router';
import { NotifierActions } from './notifier';
import { SignOutActionSuccess } from './user/signOut';

type AppLoading = { type: 'APP_LOADING'; loading: boolean };

export type SharedActions =
    | AppLoading
    | RouterAction
    | NotifierActions
    | SignOutActionSuccess;
