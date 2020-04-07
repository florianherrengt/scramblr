import { push } from 'connected-react-router';
import { isEmpty } from 'lodash';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    decrypt,
    formatGraphqlErrors,
    getApi,
    GetCurrentUserNotesQuery,
    Tag,
} from '../../../helpers';
import { SharedActions } from '../../shared';

export interface SearchNotesActionReset {
    type: 'SEARCH_NOTES_RESET';
}

export interface SearchNotesActionFetching {
    type: 'SEARCH_NOTES_REQUEST';
}

export interface SearchNotesActionSuccess {
    type: 'SEARCH_NOTES_SUCCESS';
    notes: GetCurrentUserNotesQuery['currentUserNotes'];
    aesPassphrase?: string;
}

export interface SearchNotesActionFailure {
    type: 'SEARCH_NOTES_FAILURE';
    error: string;
}

export type SearchNoteAction =
    | SharedActions
    | SearchNotesActionReset
    | SearchNotesActionFetching
    | SearchNotesActionSuccess
    | SearchNotesActionFailure;

export const getTagsIdFromSearch = (
    decryptedTags: Tag[],
    searchFilter: string,
): string[] => {
    if (!searchFilter) {
        return [];
    }
    const searchFilterTags = searchFilter.split(',').map(word => word.trim());

    const tagsIdFilter = decryptedTags
        .filter(tag => searchFilterTags.includes(tag.label))
        .map(tag => tag.id);

    return tagsIdFilter;
};

export const resetSearchNotes = () => async (
    dispatch: ThunkDispatch<{}, {}, SearchNoteAction>,
    getState: () => RootState,
) => {
    dispatch({ type: 'SEARCH_NOTES_RESET' });
};
interface SearchOptions {
    tagsId: string[];
}

export const searchNotes = (options: SearchOptions) => async (
    dispatch: ThunkDispatch<{}, {}, SearchNoteAction>,
    getState: () => RootState,
) => {
    const state = getState();

    const api = getApi();
    if (isEmpty(options.tagsId)) {
        dispatch({
            type: 'SEARCH_NOTES_RESET',
        });
        return;
    }

    if (state.currentUserNotes.isFetching) {
        return;
    }

    dispatch({
        type: 'SEARCH_NOTES_REQUEST',
    });

    try {
        const { currentUserNotes } = await api.getCurrentUserNotes({
            tagsId: options.tagsId,
            limit: 10,
        });

        dispatch({
            type: 'SEARCH_NOTES_SUCCESS',
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
        console.error(error);
        dispatch({
            type: 'SEARCH_NOTES_FAILURE',
            error,
        });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
    }
};
