import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineSpacer } from '../../components';
import { RootState } from '../../reducers';
import { AesPassphraseContainer } from './AesPassphraseContainer';
import { CreateNoteContainer } from './CreateNoteContainer';
import { NoteListContainer } from '../../containers/NoteListContainer';
import { fetchCurrentUserNotes } from '../../actions';

export const NotesPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            fetchCurrentUserNotes({
                variables: { limit: 10 },
            }),
        );
    }, [dispatch]);
    const aesPassphrase = useSelector(
        (state: RootState) => state.currentUser.aesPassphrase,
    );
    const searchValue = useSelector(
        (state: RootState) => state.searchNotes.searchValue,
    );
    const currentUserNotes = useSelector(
        (state: RootState) => state.currentUserNotes,
    );
    const loadMore = () => {
        if (!currentUserNotes.isFetching && currentUserNotes.hasMore) {
            dispatch(
                fetchCurrentUserNotes({
                    forceReload: true,
                    variables: {
                        limit: 100,
                        skip: currentUserNotes.notes.length,
                    },
                }),
            );
        }
    };
    return (
        <div>
            <LineSpacer />
            {!searchValue &&
                (!aesPassphrase ? (
                    <AesPassphraseContainer />
                ) : (
                    <CreateNoteContainer />
                ))}
            <LineSpacer />
            <NoteListContainer
                displayedNotes={currentUserNotes}
                loadMore={loadMore}
            />
        </div>
    );
};
