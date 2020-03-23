import { Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTag } from '../../actions';
import { CreateTagForm } from '../../components/CreateTagForm';
import { RootState } from '../../reducers';

interface TagsListContainerProps {}

export const CreateTagContainer: React.SFC<TagsListContainerProps> = props => {
  const dispatch = useDispatch();
  const aesPassphrase = useSelector(
    (state: RootState) => state.currentUser.aesPassphrase,
  );

  if (!aesPassphrase) {
    return <Typography>No aes passphrase found...</Typography>;
  }
  return (
    <CreateTagForm
      onSubmit={label => dispatch(createTag({ input: { label } }))}
    />
  );
};
