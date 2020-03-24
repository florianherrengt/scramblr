import { ThunkAction } from 'redux-thunk';
import {
    decrypt,
    GetCurrentUserNotesQuery,
    GetCurrentUserNotesQueryVariables,
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
    type: 'GET_CURRENT_USER_NOTES_FAILURE';
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
        console.debug('action.fetchCurrentUserNotes')
        const state = getState();

        const token = state.currentUser.token;

        if (!token) {
            console.debug('Undefined token. Redirecting to /sign-in')
            dispatch(push(routerUri.signIn));
            return;
        }
        if (!token) {
            console.debug('Undefined token. Redirecting to /sign-in')
            dispatch(push(routerUri.signIn));
            return;
        }

        if (state.currentUserNotes.fetched && !options?.forceReload) {
            return;
        }
        const api = getApi({ token });

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
            console.error(error)
            dispatch({
                type: 'GET_CURRENT_USER_NOTES_FAILURE',
            });
        }
    };
