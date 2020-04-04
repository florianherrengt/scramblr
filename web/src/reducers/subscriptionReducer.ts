import { PaymentActions } from '../actions';
import { PaymentMethod } from '../helpers';

export interface PaymentState {
    paymentMethods: PaymentMethod[];
    isSubscribed: boolean;
    fetching: boolean;
    fetched: boolean;
}

const defaultState: PaymentState = {
    paymentMethods: [],
    isSubscribed: false,
    fetched: false,
    fetching: false,
};

export const subscription = (state = defaultState, action: PaymentActions) => {
    switch (action.type) {
        case 'GET_PAYMENT_METHODS_REQUEST':
            return { ...state, fetching: true };
        case 'GET_PAYMENT_METHODS_SUCCESS':
            return {
                ...state,
                paymentMethods: action.paymentMethods,
                fetched: true,
                fetching: false,
            };
        case 'GET_PAYMENT_METHODS_FAILURE':
            return { ...state, fetching: false, fetched: true };
        default:
            return state;
    }
};
