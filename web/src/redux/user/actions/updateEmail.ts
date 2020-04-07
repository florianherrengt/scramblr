import { push } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    formatGraphqlErrors,
    getApi,
    MutationUpdateEmailArgs,
} from '../../../helpers';
import { enqueueSnackbar } from '../../actions';
import { SharedActions } from '../../shared';
import { GetCurrentUserAction } from './fetchUser';

export interface UpdateEmailActionRequest {
    type: 'UPDATE_EMAIL_REQUEST';
}

export interface UpdateEmailActionSuccess {
    type: 'UPDATE_EMAIL_SUCCESS';
}

export interface UpdateEmailActionFailure {
    type: 'UPDATE_EMAIL_FAILURE';
}

export type UpdateEmailAction =
    | SharedActions
    | GetCurrentUserAction
    | UpdateEmailActionRequest
    | UpdateEmailActionSuccess
    | UpdateEmailActionFailure;

export const updateEmail = (
    variables: MutationUpdateEmailArgs['input'],
    demo?: boolean,
): ThunkAction<Promise<void>, RootState, {}, UpdateEmailAction> => async (
    dispatch,
    getState,
) => {
    dispatch({ type: 'UPDATE_EMAIL_REQUEST' });
    const api = getApi();
    try {
        const { updateEmail: user } = await api.updateEmail({
            input: variables,
        });
        dispatch({ type: 'UPDATE_EMAIL_SUCCESS' });
        dispatch({
            type: 'GET_CURRENT_USER_SUCCESS',
            user,
        });
        dispatch(
            enqueueSnackbar({
                message: 'Email updated',
                options: { variant: 'success' },
            }),
        );
    } catch (error) {
        dispatch({ type: 'UPDATE_EMAIL_FAILURE' });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.error(error);

        dispatch(
            enqueueSnackbar({
                message: 'Error updating email',
                options: { variant: 'error' },
            }),
        );
    }
};
