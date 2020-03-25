import { combineReducers } from 'redux';
import { currentUser } from './currentUserReducer';
import { currentUserNotes } from './currentUserNotesReducer';
import { currentUserTags } from './currentUserTagsReducer';
import { searchNotes } from './searchNotes';
import { insights } from './insightsReducer';
import { notifier } from './notifier';
import { connectRouter } from 'connected-react-router';
import { history } from '../helpers/history';

export const rootReducer = combineReducers({
    currentUser,
    currentUserNotes,
    currentUserTags,
    searchNotes,
    notifier,
    insights,
    router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;
