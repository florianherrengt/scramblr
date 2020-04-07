import { action } from '@storybook/addon-actions';
import React from 'react';
import '../../styles/index.scss';
import { NoteList } from './NoteList';

export default {
    component: NoteList,
    title: 'NoteList',
};

export const Loading = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <NoteList
            notes={[]}
            tags={[]}
            isLoading
            isTagLoading
            onEditDiscard={action('onEditDiscard')}
            onEditSubmit={action('onEditSubmit')}
            onEditClick={action('onEditClick')}
            onDeleteClick={action('onDeleteClick')}
        />
    </div>
);
