import { push } from 'connected-react-router';
import CryptoJS from 'crypto-js';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    formatGraphqlErrors,
    getApi,
    MutationDeleteTagArgs,
} from '../../../helpers';
import { enqueueSnackbar } from '../../notifier/actions/enqueueSnackbar';
import { SharedActions } from '../../shared';

export interface DeleteTagActionFetching {
    type: 'DELETE_TAGS_REQUEST';
    id: string;
    transactionId: string;
}

export interface DeleteTagActionSuccess {
    type: 'DELETE_TAGS_SUCCESS';
    id: string;
    transactionId: string;
}

export interface DeleteTagActionFailure {
    type: 'DELETE_TAGS_FAILURE';
    error: string;
    transactionId: string;
}

export type DeleteTagAction =
    | SharedActions
    | DeleteTagActionFetching
    | DeleteTagActionSuccess
    | DeleteTagActionFailure;

export const deleteTag = (variables: MutationDeleteTagArgs) => async (
    dispatch: ThunkDispatch<{}, {}, DeleteTagAction>,
    getState: () => RootState,
) => {
    const api = getApi();
    const transactionId =
        new Date().valueOf().toString() +
        '-' +
        CryptoJS.lib.WordArray.random(128 / 8).toString();

    dispatch({
        type: 'DELETE_TAGS_REQUEST',
        id: variables.id,
        transactionId,
    });

    try {
        const { deleteTag } = await api.deleteTag({ id: variables.id });
        dispatch(
            enqueueSnackbar({
                message: 'Tag deleted',
                options: { variant: 'success' },
            }),
        );
        dispatch({
            type: 'DELETE_TAGS_SUCCESS',
            id: deleteTag.id,
            transactionId,
        });
    } catch (error) {
        dispatch({
            type: 'DELETE_TAGS_FAILURE',
            error,
            transactionId,
        });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('[deleteTag] Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.log(error);
        dispatch(
            enqueueSnackbar({
                message: 'Error deleting tag...',
                options: { variant: 'error' },
            }),
        );
    }
};
