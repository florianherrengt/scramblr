import { ThunkAction } from 'redux-thunk';
import {
    decrypt,
    GetCurrentUserNotesQuery,
    GetCurrentUserNotesQueryVariables,
    formatGraphqlErrors,
    getApi,
} from '../../helpers';
import { RootState } from '../../reducers';
import { routerUri } from '../../config';
import { push, RouterAction } from 'connected-react-router';

export interface GetNotesActionFetching {
    type: 'GET_CURRENT_USER_NOTES_REQUEST';
}

export interface GetNotesActionSuccess {
    type: 'GET_CURRENT_USER_NOTES_SUCCESS';
    notes: GetCurrentUserNotesQuery['currentUserNotes'];
    aesPassphrase?: string;
}

export interface GetNotesActionFailure {
    type: 'GET_CURRENT_USER_NOTES_FAILURE'
}

export type GetNoteAction =
    | RouterAction
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
        const state = getState();

        const token = state.currentUser.token

        if (!token) {
            dispatch(push(routerUri.signIn))
            return;
        }
        const api = getApi({ token })

        if (
            state.currentUserNotes.isFetching ||
            (state.currentUserNotes.fetched && !state.currentUserNotes.hasMore)
        ) {
            return;
        }

        if (!options?.forceReload) {
            if (state.currentUserNotes.fetched) {
                return;
            }
        }
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
                type: 'GET_CURRENT_USER_NOTES_FAILURE'
            });
            if (formatGraphqlErrors(error)?.isUnauthenticated) {
                dispatch(push(routerUri.signIn))
            }
        }
    };
