import { Chip, CircularProgress, TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import styled from 'styled-components';
import { RootState } from '../reducers';

export interface SelectTagProps {
  tags: RootState['currentUserTags']['tags'];
  isLoading: boolean;
  value: RootState['currentUserTags']['tags'];
  onSubmit?(): void;
  onChange(tags: RootState['currentUserTags']['tags']): void;
}

const InputContainer = styled.div`
  position: relative;
`;

const Spinner = styled(CircularProgress)`
  position: absolute;

  right: 40px;

  top: 17px;
`;

export const SelectTag: React.SFC<SelectTagProps> = props => {
  return (
    <Autocomplete
      className='SelectTag'
      style={{ flex: 1 }}
      multiple
      disabled={props.isLoading}
      autoHighlight
      // selectOnFocus
      value={props.value}
      options={props.tags}
      // autoSelect
      onChange={(event, newValues: SelectTagProps['tags']) => {
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
            <Chip label={option.label} {...getTagProps({ index })} />
          ) : null;
        });
      }}
      renderInput={params => (
        <InputContainer>
          {props.isLoading && <Spinner size={20} />}
          <TextField
            onKeyDown={event => {
              if (event.key === 'Enter') {
                if (event.ctrlKey || event.altKey || event.metaKey) {
                  props.onSubmit && props.onSubmit();
                }
              }
            }}
            variant='outlined'
            {...params}
            placeholder={props.isLoading ? 'Loading...' : 'Tags'}
          />
        </InputContainer>
      )}
    />
  );
};
