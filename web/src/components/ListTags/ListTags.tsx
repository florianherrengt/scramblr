import { ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import { ValuesType } from 'utility-types';
import { EditTagModal } from '../EditTagModal';
import { SelectTagProps } from '../SelectTag';
import { TagChip } from '../TagChip';

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
            <div style={{ textAlign: 'center' }}>
                {props.tags.map(tag => (
                    <TagChip
                        tag={tag}
                        key={tag.id}
                        style={{ margin: '10px 10px 0 0' }}
                        clickable
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
            </div>
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
