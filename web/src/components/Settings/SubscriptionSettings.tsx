import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { SettingsProps } from './Settings';
import { User, PaymentMethod } from '../../helpers';
import { LineSpacer } from '../LineSpacer';

const CardList: React.SFC<{ paymentMethods: PaymentMethod[] }> = props => {
    return (
        <div>
            {props.paymentMethods.map(({ id, card }) => {
                return (
                    <ExpansionPanel id={id} variant='elevation'>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                        >
                            <img
                                height={20}
                                alt={`${card.brand} logo`}
                                src={`/cards/${card.brand}.png`}
                            />
                            <Typography className='flex width-100'>
                                {card.last4}
                                <span className='grow' />
                                {card.expMonthString}/{card.expYear}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            })}
        </div>
    );
};

const Content: React.SFC<SettingsProps> = props => {
    return (
        <Fragment>
            {props.currentUser.user?.paymentMethods && (
                <Fragment>
                    <CardList
                        paymentMethods={props.currentUser.user.paymentMethods}
                    />
                    <LineSpacer />
                </Fragment>
            )}

            <Button
                className='width-100'
                variant='outlined'
                onClick={() => props.onSubscribeClick()}
            >
                Add card
            </Button>
            <LineSpacer />
            <Button
                className='width-100'
                color='secondary'
                variant='outlined'
                onClick={() => props.onSubscribeClick()}
            >
                Cancel subscription
            </Button>
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
