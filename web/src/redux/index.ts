import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { history } from '../helpers/history';
import { appState } from './app/appReducer';
import { insights } from './insights/insightsReducer';
import { currentUserNotes } from './notes';
import { notifier } from './notifier';
import { searchNotes } from './searchNotes';
import { subscription } from './subscription/subscriptionReducer';
import { currentUserTags } from './tags/currentUserTagsReducer';
import { currentUser } from './user/currentUserReducer';

export const rootReducer = combineReducers({
    currentUser,
    currentUserNotes,
    currentUserTags,
    searchNotes,
    notifier,
    insights,
    appState,
    subscription,
    router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;
