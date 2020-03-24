import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, updateNote } from '../actions';
import { NoteList, CreateNoteFormValues } from '../components';
import { RootState } from '../reducers';

interface NoteListContainerProps {
    loadMore(): void;
    displayedNotes: RootState['currentUserNotes'] | RootState['searchNotes'];
}

export const NoteListContainer: React.SFC<NoteListContainerProps> = props => {
    const [editingNoteId, setEditingNoteId] = useState('');
    const dispatch = useDispatch();

    const currentUserTags = useSelector(
        (state: RootState) => state.currentUserTags,
    );
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
                            dispatch(
                                updateNote({ ...input, id: editingNoteId }),
                            );
                            setEditingNoteId('');
                        }}
                        tags={currentUserTags.tags}
                        isTagLoading={currentUserTags.isFetching}
                        onDeleteClick={noteId => {
                            if (window.confirm('Delete note?')) {
                                dispatch(deleteNote(noteId));
                            }
                        }}
                        notes={props.displayedNotes.notes.map(note => {
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
            {(props.displayedNotes.isFetching ||
                currentUserTags.isFetching) && <CircularProgress />}
            {!props.displayedNotes.isFetching && props.displayedNotes.hasMore && (
                <div>
                    <Button
                        onClick={props.loadMore}
                        style={{ padding: 30 }}
                        fullWidth
                    >
                        Load more
                    </Button>
                </div>
            )}
        </div>
    );
};
