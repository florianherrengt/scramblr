import { RouterAction } from 'connected-react-router';
import { NotifierActions } from './notifier/actions/enqueueSnackbar';
import { SignOutActionSuccess } from './user/actions/signOut';

type AppLoading = { type: 'APP_LOADING'; loading: boolean };

export type SharedActions =
    | AppLoading
    | RouterAction
    | NotifierActions
    | SignOutActionSuccess;
