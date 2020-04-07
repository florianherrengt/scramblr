import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineSpacer } from '../../components';
import { NoteListContainer } from '../../containers/NoteListContainer';
import { RootState } from '../../redux';
import { fetchCurrentUserNotes } from '../../redux/actions';
import { AesPassphraseContainer } from './AesPassphraseContainer';
import { CreateNoteContainer } from './CreateNoteContainer';

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
            {!aesPassphrase ? (
                <AesPassphraseContainer />
            ) : (
                <CreateNoteContainer />
            )}
            <LineSpacer />
            <NoteListContainer
                isLoading={currentUserNotes.isFetching}
                displayedNotes={currentUserNotes}
                loadMore={loadMore}
            />
        </div>
    );
};
