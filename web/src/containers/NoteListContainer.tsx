import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ConfirmModal,
    ConfirmModalData,
    CreateNoteFormValues,
    NoteList,
} from '../components';
import { RootState } from '../redux';
import { deleteNote, updateNote } from '../redux/actions';

interface NoteListContainerProps {
    loadMore(): void;
    displayedNotes: RootState['currentUserNotes'] | RootState['searchNotes'];
    isLoading?: boolean;
}

export const NoteListContainer: React.SFC<NoteListContainerProps> = props => {
    const [confirmModalData, setConfirmModalData] = useState<ConfirmModalData>({
        action: null,
        id: null,
    });
    const [editingNoteId, setEditingNoteId] = useState('');
    const dispatch = useDispatch();

    const currentUserTags = useSelector(
        (state: RootState) => state.currentUserTags,
    );

    return (
        <div>
            <ConfirmModal
                title='Delete'
                confirmText='Delete'
                onCancel={() =>
                    setConfirmModalData({
                        action: null,
                        id: null,
                    })
                }
                open={Boolean(confirmModalData.action && confirmModalData.id)}
                onConfirm={() => {
                    if (
                        confirmModalData.action === 'delete' &&
                        confirmModalData.id
                    ) {
                        dispatch(deleteNote(confirmModalData.id));
                        setConfirmModalData({ action: null, id: null });
                    }
                }}
                message='Are you sure you want to delete this note?'
            />
            <div>
                {
                    <NoteList
                        isLoading={props.isLoading}
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
                            setConfirmModalData({
                                action: 'delete',
                                id: noteId,
                            });
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
