import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import { LineSpacer } from '../LineSpacer';
import { PaymentMethodList } from './PaymentMethodList';
import { SettingsProps } from './Settings';

const Content: React.SFC<SettingsProps> = props => {
    return (
        <Fragment>
            {props.subscription.fetching ? <CircularProgress /> : null}
            {props.subscription.paymentMethods ? (
                <Fragment>
                    <PaymentMethodList
                        paymentMethods={props.subscription.paymentMethods}
                        {...props}
                    />
                    <LineSpacer />
                </Fragment>
            ) : null}

            <Button
                disabled={props.checkoutLoading}
                className='width-100'
                variant='outlined'
                onClick={() => props.onSubscribeClick()}
            >
                {props.checkoutLoading ? <CircularProgress /> : 'Add card'}
            </Button>
            <LineSpacer />
            {props.subscription.isSubscribed ? (
                <Button
                    className='width-100'
                    color='secondary'
                    variant='outlined'
                    onClick={() => props.onCancelSubscription()}
                >
                    Cancel subscription
                </Button>
            ) : null}
        </Fragment>
    );
};

export const SubscriptionSettings: React.SFC<SettingsProps> = props => {
    return (
        <Card variant='outlined'>
            <CardHeader title='Subscription' />
            <CardContent>
                {!props.currentUser.user?.email ||
                !props.currentUser.user?.emailConfirmed ? (
                    <Typography>
                        You need a confirmed email address to subscribe.
                    </Typography>
                ) : (
                    <Content {...props} />
                )}
            </CardContent>
        </Card>
    );
};
