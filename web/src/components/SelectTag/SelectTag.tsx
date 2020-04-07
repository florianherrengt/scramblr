import { CircularProgress, TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { RootState } from '../../redux';
import { TagChip } from '../TagChip';

export interface SelectTagProps {
    tags: RootState['currentUserTags']['tags'];
    isLoading: boolean;
    value: RootState['currentUserTags']['tags'];
    onSubmit?(): void;
    onChange(tags: RootState['currentUserTags']['tags']): void;
}

export const SelectTag: React.SFC<SelectTagProps> = props => {
    return (
        <Autocomplete
            className='SelectTag'
            style={{ flex: 1 }}
            multiple
            disabled={props.isLoading}
            autoHighlight
            value={props.value}
            options={props.tags}
            getOptionLabel={option => option.label}
            onChange={(_, newValues: SelectTagProps['tags']) => {
                props.onChange(newValues);
            }}
            noOptionsText={
                !props.tags.length
                    ? "You haven't created any tags yet."
                    : 'Tag not found.'
            }
            renderOption={option => option.label}
            renderTags={(value: SelectTagProps['tags'], getTagProps) => {
                return value.map((option, index) => {
                    return option ? (
                        <TagChip tag={option} {...getTagProps({ index })} />
                    ) : null;
                });
            }}
            renderInput={params => (
                <div className='SelectTag_InputContainer'>
                    {props.isLoading && (
                        <CircularProgress
                            className='SelectTag_InputContainer_CircularProgress'
                            size={20}
                        />
                    )}
                    <TextField
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                if (
                                    event.ctrlKey ||
                                    event.altKey ||
                                    event.metaKey
                                ) {
                                    props.onSubmit && props.onSubmit();
                                }
                            }
                        }}
                        variant='outlined'
                        {...params}
                        placeholder={props.isLoading ? 'Loading...' : 'Tags'}
                    />
                </div>
            )}
        />
    );
};
