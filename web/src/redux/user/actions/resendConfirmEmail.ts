import { push } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    formatGraphqlErrors,
    getApi,
    ResendConfirmEmailMutationVariables,
} from '../../../helpers';
import { enqueueSnackbar } from '../../actions';
import { SharedActions } from '../../shared';

export interface ResendEmailActionRequest {
    type: 'RESEND_EMAIL_REQUEST';
}

export interface ResendEmailActionSuccess {
    type: 'RESEND_EMAIL_SUCCESS';
}

export interface ResendEmailActionFailure {
    type: 'RESEND_EMAIL_FAILURE';
}

export type ResendConfirmEmailAction =
    | SharedActions
    | ResendEmailActionRequest
    | ResendEmailActionSuccess
    | ResendEmailActionFailure;

export const resendConfirmEmail = (
    variables: ResendConfirmEmailMutationVariables,
): ThunkAction<
    Promise<void>,
    RootState,
    {},
    ResendConfirmEmailAction
> => async (dispatch, getState) => {
    dispatch({ type: 'RESEND_EMAIL_REQUEST' });
    const api = getApi();
    try {
        await api.resendConfirmEmail();
        dispatch(
            enqueueSnackbar({
                message: 'Email sent!',
                options: { variant: 'success' },
            }),
        );
        dispatch({ type: 'RESEND_EMAIL_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'RESEND_EMAIL_FAILURE' });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.error(error);
        dispatch(
            enqueueSnackbar({
                message: 'Error sending email',
                options: { variant: 'error' },
            }),
        );
    }
};
