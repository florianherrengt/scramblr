import { push } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { routerUri } from '../../config';
import {
    getApi,
    formatGraphqlErrors,
    MutationUpdateEmailArgs,
} from '../../helpers';
import { RootState } from '../../reducers';
import { SharedActions } from '../shared';
import { GetCurrentUserAction } from './fetchUser';
import { enqueueSnackbar } from '..';

export type UpdateEmailAction = SharedActions | GetCurrentUserAction;

export const updateEmail = (
    variables: MutationUpdateEmailArgs['input'],
    demo?: boolean,
): ThunkAction<Promise<void>, RootState, {}, UpdateEmailAction> => async (
    dispatch,
    getState,
) => {
    const api = getApi();
    try {
        const { updateEmail: user } = await api.updateEmail({
            input: variables,
        });
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
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
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
