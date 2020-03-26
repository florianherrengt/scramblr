import '../../styles/index.scss';
import React from 'react';
import { NoteCard } from './NoteCard';
import { RootState } from '../../reducers';
import { ValuesType } from 'utility-types';
import { action } from '@storybook/addon-actions';

export default {
    component: NoteCard,
    title: 'NoteCard',
};

const note: ValuesType<RootState['currentUserNotes']['notes']> = {
    id: 'fakeid',
    createdAt: new Date(),
    isLoading: false,
    text: 'Hello this is a note',
    tags: [],
};

export const Default = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <NoteCard
            tags={[]}
            note={note}
            onEditClick={action('edit')}
            onDeleteClick={action('delete')}
        />
    </div>
);

export const Loading = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <NoteCard
            tags={[]}
            note={{ ...note, isLoading: true }}
            onEditClick={action('edit')}
            onDeleteClick={action('delete')}
        />
    </div>
);
export const Placeholder = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <NoteCard
            tags={[]}
            note={note}
            onEditClick={action('edit')}
            onDeleteClick={action('delete')}
            isPlaceholder
        />
    </div>
);
