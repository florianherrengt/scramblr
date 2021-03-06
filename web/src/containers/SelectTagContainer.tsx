import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectTag, SelectTagProps } from '../components';
import { RootState } from '../redux';
import { fetchCurrentUserTags } from '../redux/actions';

interface SelectTagContainerProps {
    onSubmit?: SelectTagProps['onSubmit'];
    onChange: SelectTagProps['onChange'];
}

export const SelectTagContainer = (props: SelectTagContainerProps) => {
    const dispatch = useDispatch();
    const [selectedTags, setSelectedTags] = useState<SelectTagProps['tags']>(
        [],
    );
    useEffect(() => {
        dispatch(fetchCurrentUserTags());
    }, [dispatch]);

    const currentUserTags = useSelector(
        (state: RootState) => state.currentUserTags,
    );
    return (
        <SelectTag
            value={selectedTags}
            tags={currentUserTags.tags}
            isLoading={currentUserTags.isFetching}
            onSubmit={props.onSubmit}
            onChange={tags => {
                setSelectedTags(tags);
                props.onChange(tags);
            }}
        />
    );
};
