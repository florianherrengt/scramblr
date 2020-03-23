import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, RootState } from '../reducers';

export const configureStore = (preloadedState: Partial<RootState>) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk));
