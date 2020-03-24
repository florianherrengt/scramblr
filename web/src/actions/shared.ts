import { RouterAction } from 'connected-react-router';
import { NotifierActions } from './notifier';

export type SharedActions = RouterAction | NotifierActions;
