import { action } from '@storybook/addon-actions';
import * as faker from 'faker';
import React from 'react';
import { RootState } from '../../redux';
import { LineSpacer } from '../LineSpacer';
import { Settings } from './';
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

const subscription: RootState['subscription'] = {
    fetched: false,
    fetching: false,
    isSubscribed: false,
    paymentMethods: [],
};

export const Default = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <LineSpacer />
        <Settings
            subscription={subscription}
            onCancelSubscription={action('onCancelSubscription')}
            onDeletePaymentMethod={action('onDeletePaymentMethod')}
            onUpdateDefaultPaymentMethod={action(
                'onUpdateDefaultPaymentMethod',
            )}
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
