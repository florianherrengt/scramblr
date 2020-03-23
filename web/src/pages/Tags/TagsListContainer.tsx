import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTag, updateTag } from '../../actions';
import { ListTags } from '../../components';
import { RootState } from '../../reducers';

interface TagsListContainerProps {}

export const TagsListContainer: React.SFC<TagsListContainerProps> = props => {
  const dispatch = useDispatch();

  const aesPassphrase = useSelector(
    (state: RootState) => state.currentUser.aesPassphrase,
  );
  const currentUserTags = useSelector(
    (state: RootState) => state.currentUserTags,
  );

  if (!aesPassphrase) {
    return <Typography>No aes passphrase found...</Typography>;
  }

  return (
    <div>
      <ListTags
        onUpdate={tag => dispatch(updateTag({ input: tag }))}
        onDelete={id => dispatch(deleteTag({ id }))}
        tags={currentUserTags.tags}
      />
      {currentUserTags.isFetching && <CircularProgress />}
    </div>
  );
};
