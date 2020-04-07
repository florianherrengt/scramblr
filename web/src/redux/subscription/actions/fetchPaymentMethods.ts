import { push } from 'connected-react-router';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import { formatGraphqlErrors, getApi, PaymentMethod } from '../../../helpers';
import { enqueueSnackbar } from '../../notifier/actions/enqueueSnackbar';
import { SharedActions } from '../../shared';

export interface GetPaymentMethodsFetching {
    type: 'GET_PAYMENT_METHODS_REQUEST';
}

export interface GetPaymentMethodsSuccess {
    type: 'GET_PAYMENT_METHODS_SUCCESS';
    paymentMethods: PaymentMethod[];
}

export interface GetPaymentMethodsFailure {
    type: 'GET_PAYMENT_METHODS_FAILURE';
}

export type GetPaymentMethods =
    | SharedActions
    | GetPaymentMethodsFetching
    | GetPaymentMethodsSuccess
    | GetPaymentMethodsFailure;

export const fetchPaymentMethods: ActionCreator<ThunkAction<
    Promise<GetPaymentMethods>,
    RootState,
    undefined,
    GetPaymentMethods
>> = () => async (dispatch, getState) => {
    const api = getApi();

    dispatch({
        type: 'GET_PAYMENT_METHODS_REQUEST',
    });
    try {
        const { paymentMethods } = await api.getPaymentMethods();
        return dispatch({
            type: 'GET_PAYMENT_METHODS_SUCCESS',
            paymentMethods,
        });
    } catch (error) {
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
        } else {
            console.error(error);
            dispatch(
                enqueueSnackbar({
                    message: 'Error fetching payment methods',
                    options: { variant: 'error' },
                }),
            );
        }

        return dispatch({
            type: 'GET_PAYMENT_METHODS_FAILURE',
        });
    }
};
