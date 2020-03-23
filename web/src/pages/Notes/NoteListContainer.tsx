import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, fetchCurrentUserNotes, updateNote } from '../../actions';
import { NoteList, CreateNoteFormValues } from '../../components';
import { RootState } from '../../reducers';

interface NoteListContainerProps {}

export const getTagsIdFromSearch = (
  decryptedTags: any[],
  searchFilter?: string | null,
): any[] => {
  if (!searchFilter) {
    return [];
  }
  const searchFilterTags = searchFilter
    ? decodeURIComponent(searchFilter || '')
        .split(',')
        .map(word => word.trim())
    : [];
  const tagsIdFilter = decryptedTags
    ? decryptedTags
        .filter((tag: any) => searchFilterTags.includes(tag.label))
        .map((tag: any) => tag.id)
    : [];

  return tagsIdFilter;
};

export const NoteListContainer: React.SFC<NoteListContainerProps> = props => {
  const [editingNoteId, setEditingNoteId] = useState('');
  const dispatch = useDispatch();

  const currentUserNotes = useSelector(
    (state: RootState) => state.currentUserNotes,
  );
  const currentUserTags = useSelector(
    (state: RootState) => state.currentUserTags,
  );

  const searchNotes = useSelector((state: RootState) => state.searchNotes);

  const displayedNotes = searchNotes.searchValue
    ? searchNotes
    : currentUserNotes;

  const loadMore = () => {
    if (!currentUserNotes.isFetching && currentUserNotes.hasMore) {
      dispatch(
        fetchCurrentUserNotes({
          forceReload: true,
          variables: { limit: 100, skip: currentUserNotes.notes.length },
        }),
      );
    }
  };

  return (
    <div>
      <div>
        {
          <NoteList
            editingNoteId={editingNoteId}
            onEditClick={noteId => {
              setEditingNoteId(noteId);
            }}
            onEditDiscard={() => setEditingNoteId('')}
            onEditSubmit={(input: CreateNoteFormValues) => {
              dispatch(updateNote({ ...input, id: editingNoteId }));
              setEditingNoteId('');
            }}
            tags={currentUserTags.tags}
            isTagLoading={currentUserTags.isFetching}
            onDeleteClick={noteId => {
              dispatch(deleteNote(noteId));
            }}
            notes={displayedNotes.notes.map(note => {
              const tags = note.tags
                .map(
                  tag =>
                    currentUserTags.tags.find(
                      userTag => userTag.id === tag.id,
                    )!,
                )
                .filter(t => t);

              return {
                note,
                tags: tags.length ? tags : [],
              };
            })}
          />
        }
      </div>
      {(currentUserNotes.isFetching || currentUserTags.isFetching) && (
        <CircularProgress />
      )}
      {!currentUserNotes.isFetching && currentUserNotes.hasMore && (
        <div>
          <Button onClick={loadMore} style={{ padding: 30 }} fullWidth>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};
