import '../../styles/index.scss';
import React from 'react';
import { NoteList } from './NoteList';
import { RootState } from '../../reducers';
import { ValuesType } from 'utility-types';
import { action } from '@storybook/addon-actions';

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
