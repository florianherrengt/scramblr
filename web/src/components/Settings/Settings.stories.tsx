import React from 'react';
import { action } from '@storybook/addon-actions';
import { Settings } from './';
import { LineSpacer } from '../LineSpacer';
import { RootState } from '../../reducers';
import * as faker from 'faker';
export default {
    title: 'Setting',
};

const user: RootState['currentUser'] = {
    fetched: true,
    isFetching: false,
    user: {
        username: 'demo user',
        email: faker.internet.email(),
        emailConfirmed: 1,
    },
};

export const Default = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <LineSpacer />
        <Settings
            checkoutLoading={false}
            onSubscribeClick={action('onSubscribeClick')}
            onResendEmailClick={action('onResendEmailClick')}
            onUpdateEmail={action('onUpdateEmail')}
            currentUser={user}
            onLogoutClick={action('onLogoutClick')}
            onExportClick={action('onExportClick')}
        />
    </div>
);
