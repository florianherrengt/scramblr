import { Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTagForm } from '../../components';
import { RootState } from '../../redux';
import { createTag } from '../../redux/actions';

interface TagsListContainerProps {}

export const CreateTagContainer: React.SFC<TagsListContainerProps> = props => {
    const dispatch = useDispatch();
    const aesPassphrase = useSelector(
        (state: RootState) => state.currentUser.aesPassphrase,
    );

    if (!aesPassphrase) {
        return <Typography>No aes passphrase found...</Typography>;
    }
    return <CreateTagForm onSubmit={input => dispatch(createTag({ input }))} />;
};
