import { combineReducers } from 'redux';
import { currentUser } from './currentUserReducer';
import { currentUserNotes } from './notes';
import { currentUserTags } from './currentUserTagsReducer';
import { appState } from './appReducer';
import { searchNotes } from './searchNotes';
import { insights } from './insightsReducer';
import { notifier } from './notifier';
import { subscription } from './subscriptionReducer';
import { connectRouter } from 'connected-react-router';
import { history } from '../helpers/history';

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
