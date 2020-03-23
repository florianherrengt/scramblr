import {
  Card,
  CardContent,
  CardHeader,
  Chip,
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
import styled from 'styled-components';
import { Optional, ValuesType } from 'utility-types';
import { RootState } from '../reducers';

export interface NoteCardProps {
  note: ValuesType<RootState['currentUserNotes']['notes']>;
  tags: Array<Optional<ValuesType<RootState['currentUserTags']['tags']>>>;
  onEditClick(noteId: string): void;
  onDeleteClick(noteId: string): void;
}

// using number instead of boolean because react complains about it otherwise...
const Container = styled(Card)<{ loading: number }>`
  position: relative;
  opacity: ${props => (props.loading ? 0.5 : 1)};
`;

const Spinner = styled(CircularProgress)`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const HeaderTypography = styled(Typography)`
  font-size: 12px;
  margin-bottom: 5px;
`;

export const NoteCard: React.SFC<NoteCardProps> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const text = props.note.text;

  return (
    <Container
      className='NoteCard'
      variant='outlined'
      loading={props.note.isLoading ? 1 : 0}
    >
      <CardHeader
        style={{ paddingBottom: 0 }}
        title={
          <HeaderTypography>
            {formatDistance(new Date(props.note.createdAt), new Date()) +
              ' ago'}
          </HeaderTypography>
        }
        subheader={props.tags.map(tag => {
          return (
            <Chip
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
        {props.note.isLoading && <Spinner size={10} />}
        <Typography
          variant='body1'
          dangerouslySetInnerHTML={{
            __html: text.replace(/\n/gi, '<br />').trim(),
          }}
        />
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
    </Container>
  );
};
