import '../styles/index.scss';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { CreateTagForm } from '../components';

export default {
    component: CreateTagForm,
    title: 'CreateTagForm',
};

export const Default = () => (
    <div style={{ width: 600, margin: 'auto' }}>
        <CreateTagForm onSubmit={action('onSubmit')} />
    </div>
);
