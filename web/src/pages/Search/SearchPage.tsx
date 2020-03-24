import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineSpacer } from '../../components';
import { RootState } from '../../reducers';
import { NoteListContainer } from '../../containers/NoteListContainer';
import { fetchCurrentUserNotes, resetSearchNotes } from '../../actions';

export const SearchPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(resetSearchNotes());
        };
    }, [dispatch]);
    const searchNotes = useSelector((state: RootState) => state.searchNotes);
    const loadMore = () => {
        if (!searchNotes.isFetching && searchNotes.hasMore) {
            dispatch(
                fetchCurrentUserNotes({
                    forceReload: true,
                    variables: {
                        limit: 100,
                        skip: searchNotes.notes.length,
                    },
                }),
            );
        }
    };
    return (
        <Fragment>
            <LineSpacer />
            <NoteListContainer
                displayedNotes={searchNotes}
                loadMore={loadMore}
            />
        </Fragment>
    );
};
