import {
  Chip,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { EditTagModal } from './EditTagModal';
import { SelectTagProps } from './SelectTag';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { ValuesType } from 'utility-types';

interface ListTagsProps {
  tags: SelectTagProps['tags'];
  onUpdate(tag: ValuesType<SelectTagProps['tags']>): void;
  onDelete(id: string): void;
}

export const ListTags: React.SFC<ListTagsProps> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [clickedTagId, setClickedTagId] = React.useState<null | string>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  return (
    <div className='ListTags'>
      <EditTagModal
        open={isEditing}
        label={props.tags.find(t => t.id === clickedTagId)?.label || ''}
        onClose={() => setIsEditing(false)}
        onSubmit={label => {
          setIsEditing(false);
          props.onUpdate({
            ...props.tags.find(t => t.id === clickedTagId)!,
            label,
          });
        }}
      />
      {props.tags.map(tag => (
        <Chip
          key={tag.id}
          style={{ margin: '10px 10px 0 0' }}
          clickable
          label={tag.label}
          size='medium'
          deleteIcon={<EditIcon fontSize='small' />}
          onClick={event => {
            setClickedTagId(tag.id);
            setAnchorEl(event.currentTarget);
          }}
          onDelete={event => {
            setClickedTagId(tag.id);
            setAnchorEl(event.currentTarget);
          }}
        />
      ))}
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setIsEditing(true);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (
              window.confirm(
                'Are you sure? This tag will be removed from all your notes.',
              )
            ) {
              clickedTagId && props.onDelete(clickedTagId);
            }
            setClickedTagId(null);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Delete</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
