import React, { useEffect } from 'react';

import { TagsListContainer } from './TagsListContainer';
import { CreateTagContainer } from './CreateTagContainer';
import { LineSpacer } from '../../components';
import { useDispatch } from 'react-redux';
import { fetchCurrentUserTags } from '../../actions';

interface TagsPageProps {}

export const TagsPage: React.SFC<TagsPageProps> = props => {
    console.debug('TagsPage');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCurrentUserTags());
    }, [dispatch]);
    return (
        <div>
            <LineSpacer />
            <CreateTagContainer />
            <LineSpacer />
            <TagsListContainer />
        </div>
    );
};
