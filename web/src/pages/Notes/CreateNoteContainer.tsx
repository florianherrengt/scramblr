import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from '../../actions';
import { CreateNote } from '../../components';
import { RootState } from '../../reducers';

interface CreateNoteContainerProps {}

export const CreateNoteContainer: React.SFC<CreateNoteContainerProps> = () => {
  const dispatch = useDispatch();

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
