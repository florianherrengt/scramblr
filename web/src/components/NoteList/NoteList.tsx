import { Fab, Slide, useScrollTrigger } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { CreateNote, CreateNoteProps } from '../CreateNote';
import { LineSpacer } from '../LineSpacer';
import { NoteCard, NoteCardProps } from '../NoteCard';

interface NoteListProps {
    notes: Array<{
        note: NoteCardProps['note'];
        tags: NoteCardProps['tags'];
    }>;
    tags: CreateNoteProps['tags'];
    isLoading?: boolean;
    isTagLoading: CreateNoteProps['isTagLoading'];
    onEditDiscard: CreateNoteProps['onDiscard'];
    onEditSubmit: CreateNoteProps['onSubmit'];
    editingNoteId?: NoteCardProps['note']['id'];
    onEditClick(noteId: string): void;
    onDeleteClick(noteId: string): void;
}

export const NoteList: React.SFC<NoteListProps> = props => {
    const scrollTriggerGoTop = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return (
        <div className='NoteList'>
            {props.isLoading &&
                Array(10)
                    .fill(null, 0, 9)
                    .map((_, index) => (
                        <Fragment key={index}>
                            <NoteCard
                                tags={[]}
                                note={{
                                    id: 'fakeid',
                                    createdAt: new Date(),
                                    isLoading: false,
                                    text: 'Hello this is a note',
                                    tags: [],
                                }}
                                onEditClick={() => null}
                                onDeleteClick={() => null}
                                isPlaceholder
                            />
                            <LineSpacer />
                        </Fragment>
                    ))}
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

            <Slide direction='up' in={scrollTriggerGoTop}>
                <div className='NoteList_GoTop'>
                    <Fab
                        className='NoteList_Button_ScrollTop'
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                        color='inherit'
                        size='small'
                    >
                        <KeyboardArrowUpIcon />
                    </Fab>
                </div>
            </Slide>
        </div>
    );
};
