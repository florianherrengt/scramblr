import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LineSpacer } from '../../components';
import { fetchCurrentUserTags } from '../../redux/actions';
import { CreateTagContainer } from './CreateTagContainer';
import { TagsListContainer } from './TagsListContainer';

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
