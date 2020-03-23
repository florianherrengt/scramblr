import { Fab, Slide } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import { useThrottledFn, useWindowScroll } from 'beautiful-react-hooks';
import React, { useState } from 'react';
import styled from 'styled-components';
import { CreateNote, CreateNoteProps } from './CreateNote';
import { LineSpacer } from './LineSpacer';
import { NoteCard, NoteCardProps } from './NoteCard';

interface NoteListProps {
  notes: Array<{
    note: NoteCardProps['note'];
    tags: NoteCardProps['tags'];
  }>;
  tags: CreateNoteProps['tags'];
  isTagLoading: CreateNoteProps['isTagLoading'];
  onEditDiscard: CreateNoteProps['onDiscard'];
  onEditSubmit: CreateNoteProps['onSubmit'];
  editingNoteId?: NoteCardProps['note']['id'];
  onEditClick(noteId: string): void;
  onDeleteClick(noteId: string): void;
}

const GoToTopFabContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const NoteList: React.SFC<NoteListProps> = props => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useWindowScroll(
    (useThrottledFn(
      () => setScrollY(window.scrollY),
      1000,
    ) as unknown) as () => {},
  );

  return (
    <div className='NoteList'>
      {props.notes.map(({ note, tags }) => (
        <div key={note.id}>
          {props.editingNoteId === note.id ? (
            <CreateNote
              defaultText={note.text}
              defaultTags={tags}
              isTagLoading={props.isTagLoading}
              tags={props.tags}
              onSubmit={props.onEditSubmit}
              onDiscard={props.onEditDiscard}
            />
          ) : (
            <NoteCard
              onEditClick={props.onEditClick}
              onDeleteClick={props.onDeleteClick}
              note={note}
              tags={tags}
            />
          )}
          <LineSpacer />
        </div>
      ))}

      <Slide direction='up' in={!!scrollY} mountOnEnter unmountOnExit>
        <GoToTopFabContainer>
          <Fab
            className='NoteList_Button_ScrollTop'
            onClick={() => {
              window.scrollTo(0, 0);
              setScrollY(0);
            }}
            color='primary'
            size='small'
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </GoToTopFabContainer>
      </Slide>
    </div>
  );
};
