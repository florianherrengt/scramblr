import { combineReducers } from 'redux';
import { currentUser } from './currentUserReducer';
import { currentUserNotes } from './currentUserNotesReducer';
import { currentUserTags } from './currentUserTagsReducer';
import { searchNotes } from './searchNotes';

export const rootReducer = combineReducers({
  currentUser,
  currentUserNotes,
  currentUserTags,
  searchNotes,
});

export type RootState = ReturnType<typeof rootReducer>;
