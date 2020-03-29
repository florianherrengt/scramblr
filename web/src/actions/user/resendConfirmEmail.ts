import { push } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { enqueueSnackbar } from '..';
import { routerUri } from '../../config';
import {
    formatGraphqlErrors,
    getApi,
    ResendConfirmEmailMutationVariables,
} from '../../helpers';
import { RootState } from '../../reducers';
import { SharedActions } from '../shared';

export type ResendEmailAction = SharedActions;

export const resendConfirmEmail = (
    variables: ResendConfirmEmailMutationVariables,
): ThunkAction<Promise<void>, RootState, {}, ResendEmailAction> => async (
    dispatch,
    getState,
) => {
    const api = getApi();
    try {
        await api.resendConfirmEmail();
        dispatch(
            enqueueSnackbar({
                message: 'Email sent!',
                options: { variant: 'success' },
            }),
        );
    } catch (error) {
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
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
