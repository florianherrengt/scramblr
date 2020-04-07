import { push } from 'connected-react-router';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import { formatGraphqlErrors, getApi } from '../../../helpers';
import { fetchCurrentUser, GetCurrentUserAction } from '../../user/actions';

export const deletePaymentMethod: ActionCreator<ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    GetCurrentUserAction
>> = (paymentMethodId: string) => async (dispatch, getState) => {
    const api = getApi();
    try {
        dispatch({ type: 'APP_LOADING', loading: true });
        await api.deletePaymentMethod({ id: paymentMethodId });
        await dispatch(fetchCurrentUser());
        dispatch({ type: 'APP_LOADING', loading: false });
    } catch (error) {
        dispatch({ type: 'APP_LOADING', loading: false });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
        } else {
            console.error(error);
        }
    }
};
