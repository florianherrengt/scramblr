import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineSpacer } from '../../components';
import { NoteListContainer } from '../../containers/NoteListContainer';
import { SelectTagContainer } from '../../containers/SelectTagContainer';
import { RootState } from '../../redux';
import {
    fetchCurrentUserNotes,
    resetSearchNotes,
    searchNotes,
} from '../../redux/actions';

export const SearchPage = () => {
    const dispatch = useDispatch();

    const displayedNotes = useSelector((state: RootState) => state.searchNotes);
    const [tagsId, setTagsId] = useState<string[]>([]);

    useEffect(() => {
        if (tagsId.length) {
            dispatch(
                searchNotes({
                    tagsId,
                }),
            );
        }
        return () => {
            dispatch(resetSearchNotes());
        };
    }, [dispatch, setTagsId, tagsId]);

    const loadMore = () => {
        if (!displayedNotes.isFetching && displayedNotes.hasMore) {
            dispatch(
                fetchCurrentUserNotes({
                    forceReload: true,
                    variables: {
                        tagsId,
                        limit: 100,
                        skip: displayedNotes.notes.length,
                    },
                }),
            );
        }
    };
    return (
        <Fragment>
            <LineSpacer />
            <SelectTagContainer
                onChange={tags => setTagsId(tags.map(tag => tag.id))}
            />
            {displayedNotes.fetched && displayedNotes.total ? (
                <p className='text-center'>
                    {`${displayedNotes.total} note${
                        displayedNotes.total !== 1 ? 's' : ''
                    } found`}{' '}
                </p>
            ) : null}
            <LineSpacer />
            <NoteListContainer
                displayedNotes={displayedNotes}
                loadMore={loadMore}
            />
            {displayedNotes.fetched && !displayedNotes.total && (
                <Fragment>
                    <LineSpacer />
                    <p className='text-center'>No results</p>
                </Fragment>
            )}
        </Fragment>
    );
};
