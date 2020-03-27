import '../styles/index.scss';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { NoteList, CreateNote, LineSpacer } from '../components';
import { TopBar } from '../containers/MainLayout/TopBar';
import { Router } from 'react-router-dom';
import { history } from '../helpers/history';

export default {
    title: 'Landing page',
};

export const NoteScreenshot = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <Router history={history}>
            <TopBar onMenuClick={action('menu click')} />
            <CreateNote
                tags={[]}
                isTagLoading={false}
                onSubmit={action('submit')}
            />
            <LineSpacer />
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
        </Router>
    </div>
);
