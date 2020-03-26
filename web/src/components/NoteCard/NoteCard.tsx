import {
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import { formatDistance } from 'date-fns';
import React from 'react';
import { Optional, ValuesType } from 'utility-types';
import { RootState } from '../../reducers';
import classNames from 'classnames';
import { TagChip } from '../TagChip';

export interface NoteCardProps {
    note: ValuesType<RootState['currentUserNotes']['notes']>;
    tags: Array<Optional<ValuesType<RootState['currentUserTags']['tags']>>>;
    onEditClick(noteId: string): void;
    onDeleteClick(noteId: string): void;
    isPlaceholder?: boolean;
}

export const NoteCard: React.SFC<NoteCardProps> = props => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const text = props.note.text;

    return (
        <Card
            className={classNames([
                'NoteCard',
                {
                    'NoteCard--loading': props.note.isLoading,
                    'NoteCard--placeholder': props.isPlaceholder,
                },
            ])}
            variant='outlined'
        >
            <CardHeader
                style={{ paddingBottom: 0 }}
                title={
                    <Typography
                        variant='body2'
                        className='NoteCard_CardHeader_Typography'
                    >
                        {formatDistance(
                            new Date(props.note.createdAt),
                            new Date(),
                        ) + ' ago'}
                    </Typography>
                }
                subheader={props.tags.map(tag => {
                    return (
                        <TagChip
                            tag={tag}
                            key={tag.id}
                            style={{ marginRight: 5 }}
                            variant='outlined'
                            size='small'
                            label={tag.label}
                        />
                    );
                })}
                action={
                    <IconButton
                        className='NoteCard_IconButton_MoreActions'
                        onClick={event => setAnchorEl(event.currentTarget)}
                        aria-label='note-more-actions'
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <CardContent style={!props.tags.length ? { paddingTop: 0 } : {}}>
                {props.note.isLoading && (
                    <CircularProgress
                        className='NoteCard_CircularProgress'
                        size={10}
                    />
                )}
                <Typography
                    variant='body1'
                    dangerouslySetInnerHTML={{
                        __html: text.replace(/\n/gi, '<br />').trim(),
                    }}
                />
                {props.isPlaceholder && (
                    <Typography variant='body1'>Loading</Typography>
                )}
            </CardContent>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem
                    className='NoteCard_MenuItem_Edit'
                    onClick={() => {
                        setAnchorEl(null);
                        props.onEditClick(props.note.id);
                    }}
                >
                    <ListItemIcon>
                        <EditIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='inherit'>Edit</Typography>
                </MenuItem>
                <MenuItem
                    className='NoteCard_MenuItem_Delete'
                    onClick={() => {
                        setAnchorEl(null);
                        props.onDeleteClick(props.note.id);
                    }}
                >
                    <ListItemIcon>
                        <DeleteIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='inherit'>Delete</Typography>
                </MenuItem>
            </Menu>
        </Card>
    );
};
