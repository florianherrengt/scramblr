import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, RootState } from '../reducers';
import { routerMiddleware } from 'connected-react-router';
import { history } from '../helpers/history';

export const configureStore = (preloadedState: Partial<RootState>) =>
    createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(routerMiddleware(history), thunk),
    );
