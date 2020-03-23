import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Tooltip,
  useMediaQuery,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { SelectTag, SelectTagProps } from './SelectTag';
import { NoteCardProps } from './NoteCard';

export interface CreateNoteFormValues {
  text: string;
  tags: SelectTagProps['tags'];
}

export interface CreateNoteProps {
  defaultText?: string;
  defaultTags?: NoteCardProps['tags'];
  tags: SelectTagProps['tags'];
  isTagLoading: SelectTagProps['isLoading'];
  onDiscard?(): void;
  onSubmit(input: CreateNoteFormValues): void;
}

const Container = styled.div`
  width: 100%;
`;

const CreateNote = (props: CreateNoteProps) => {
  const isMobile = useMediaQuery('(max-width:450px)');
  const [text, setText] = useState<string>(props.defaultText || '');
  // @ts-ignore
  const [selectedTags, setSelectedTags] = useState<SelectTagProps['tags']>(
    // @ts-ignore
    props.defaultTags || [],
  );
  const location = useLocation();

  const reset = () => {
    setText('');
    setSelectedTags([]);
  };

  const submit = () => {
    if (!text) {
      return;
    }

    props.onSubmit({ text, tags: selectedTags });
    reset();
  };

  return (
    <Container className='CreateNote'>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (!text) {
            return;
          }
          submit();
        }}
      >
        <Card variant='outlined'>
          <CardContent>
            <TextField
              className='CreateNote_TextField_Text'
              autoFocus={!new URLSearchParams(location.search).get('search')}
              onChange={({ target: { value } }) => setText(value)}
              value={text}
              style={{ width: '100%' }}
              multiline
              variant='outlined'
              placeholder="What's in your mind?"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  if (event.ctrlKey || event.altKey || event.metaKey) {
                    event.preventDefault();
                    submit();
                  }
                }
              }}
            />
            <div
              style={{ display: isMobile ? 'block' : 'flex', marginTop: 20 }}
            >
              <div style={{ flex: 1 }}>
                <SelectTag
                  value={selectedTags}
                  tags={props.tags}
                  isLoading={props.isTagLoading}
                  onSubmit={() => submit()}
                  onChange={tags => {
                    setSelectedTags(tags);
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardActions>
            <div style={{ flexGrow: 1 }} />
            <Button
              id='note-button-discard'
              color='secondary'
              onClick={() => {
                props.onDiscard && props.onDiscard();
                reset();
              }}
            >
              {props.defaultText ? 'Cancel' : 'Discard'}
            </Button>
            <Tooltip
              disableTouchListener
              enterDelay={0}
              title={`${
                navigator.platform.toLocaleLowerCase().includes('mac')
                  ? 'Cmd'
                  : 'Ctrl'
              } + Enter`}
              aria-label='save with Ctrl + Enter'
            >
              <Button className='CreateNote_Button_Submit' type='submit'>
                Save
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};

export { CreateNote };
