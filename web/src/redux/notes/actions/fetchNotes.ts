import { push } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    decrypt,
    formatGraphqlErrors,
    getApi,
    GetCurrentUserNotesQuery,
    GetCurrentUserNotesQueryVariables,
} from '../../../helpers';
import { SharedActions } from '../../shared';

export interface GetNotesActionFetching {
    type: 'GET_CURRENT_USER_NOTES_REQUEST';
}

export interface GetNotesActionSuccess {
    type: 'GET_CURRENT_USER_NOTES_SUCCESS';
    notes: GetCurrentUserNotesQuery['currentUserNotes'];
    aesPassphrase?: string;
}

export interface GetNotesActionFailure {
    type: 'GET_CURRENT_USER_NOTES_FAILURE';
}

export type GetNoteAction =
    | SharedActions
    | GetNotesActionFetching
    | GetNotesActionSuccess
    | GetNotesActionFailure;

interface Options {
    variables?: GetCurrentUserNotesQueryVariables;
    forceReload?: boolean;
}

export const fetchCurrentUserNotes = (
    options?: Options,
): ThunkAction<Promise<void>, RootState, Options, GetNoteAction> => async (
    dispatch,
    getState,
) => {
    console.debug('action.fetchCurrentUserNotes');
    const state = getState();

    if (state.currentUserNotes.fetched && !options?.forceReload) {
        return;
    }
    const api = getApi();

    dispatch({
        type: 'GET_CURRENT_USER_NOTES_REQUEST',
        isFetching: true,
    });
    try {
        const { currentUserNotes } = await api.getCurrentUserNotes(
            options?.variables,
        );
        dispatch({
            type: 'GET_CURRENT_USER_NOTES_SUCCESS',
            notes: {
                ...currentUserNotes,
                items: currentUserNotes.items.map(note => ({
                    ...note,
                    text: state.currentUser.aesPassphrase
                        ? decrypt(note.text, state.currentUser.aesPassphrase)
                        : note.text,
                })),
            },
            aesPassphrase: state.currentUser.aesPassphrase,
        });
    } catch (error) {
        dispatch({
            type: 'GET_CURRENT_USER_NOTES_FAILURE',
        });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('[FetchNotes] Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.error(error);
    }
};
