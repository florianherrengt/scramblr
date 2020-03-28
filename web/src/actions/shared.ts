import { RouterAction } from 'connected-react-router';
import { NotifierActions } from './notifier';
import { SignOutActionSuccess } from './user/signOut';

export type SharedActions =
    | RouterAction
    | NotifierActions
    | SignOutActionSuccess;
