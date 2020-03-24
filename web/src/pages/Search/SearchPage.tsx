import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineSpacer, SelectTag, SelectTagProps } from '../../components';
import { RootState } from '../../reducers';
import { NoteListContainer } from '../../containers/NoteListContainer';
import {
    fetchCurrentUserNotes,
    resetSearchNotes,
    searchNotes,
} from '../../actions';
import { SelectTagContainer } from '../../containers/SelectTagContainer';
import { Card, CardContent, Typography } from '@material-ui/core';

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
            <LineSpacer />
            <NoteListContainer
                displayedNotes={displayedNotes}
                loadMore={loadMore}
            />
            {displayedNotes.fetched && !displayedNotes.notes.length && (
                <Fragment>
                    <LineSpacer />
                    <p className='text-center'>No results</p>
                </Fragment>
            )}
        </Fragment>
    );
};
