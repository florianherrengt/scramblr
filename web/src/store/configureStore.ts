import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { history } from '../helpers/history';
import { rootReducer, RootState } from '../redux';

export const configureStore = (preloadedState: Partial<RootState>) =>
    createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(routerMiddleware(history), thunk),
    );
