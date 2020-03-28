import React from 'react';
import { action } from '@storybook/addon-actions';
import { Settings } from './';
import { LineSpacer } from '../LineSpacer';

export default {
    title: 'Setting',
};

export const Default = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <LineSpacer />
        <Settings
            onLogoutClick={action('onLogoutClick')}
            onExportClick={action('onExportClick')}
        />
    </div>
);
