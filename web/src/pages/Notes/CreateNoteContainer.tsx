import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateNote } from '../../components';
import { RootState } from '../../redux';
import { createNote, fetchCurrentUserTags } from '../../redux/actions';

interface CreateNoteContainerProps {}

export const CreateNoteContainer: React.SFC<CreateNoteContainerProps> = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCurrentUserTags());
    }, [dispatch]);

    const currentUserTags = useSelector(
        (state: RootState) => state.currentUserTags,
    );

    return (
        <CreateNote
            tags={currentUserTags.tags}
            isTagLoading={currentUserTags.isFetching}
            onSubmit={input => {
                dispatch(createNote(input));
            }}
        />
    );
};
