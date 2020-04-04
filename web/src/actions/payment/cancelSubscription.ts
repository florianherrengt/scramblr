import { push } from 'connected-react-router';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { routerUri } from '../../config';
import { formatGraphqlErrors, getApi } from '../../helpers';
import { RootState } from '../../reducers';
import { fetchCurrentUser, GetCurrentUserAction } from '../user';

export const cancelSubscription: ActionCreator<ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    GetCurrentUserAction
>> = (paymentMethodId: string) => async (dispatch, getState) => {
    const api = getApi();
    try {
        dispatch({ type: 'APP_LOADING', loading: true });
        await api.cancelSubscription();
        await dispatch(fetchCurrentUser());
        dispatch({ type: 'APP_LOADING', loading: false });
    } catch (error) {
        dispatch({ type: 'APP_LOADING', loading: false });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch(push(routerUri.signIn));
        } else {
            console.error(error);
        }
    }
};
