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
import React, { Fragment, useState } from 'react';
import { SettingsProps } from './Settings';
import { User, PaymentMethod } from '../../helpers';
import { LineSpacer } from '../LineSpacer';
import { BlockSpace } from '../BlockSpace/';
import classNames from 'classnames';

const CardList: React.SFC<{ paymentMethods: PaymentMethod[] }> = props => {
    const [expanded, setExpanded] = useState<string | null>(null);
    const handleChange = (panel: string) => (
        event: React.ChangeEvent<{}>,
        isExpanded: boolean,
    ) => {
        setExpanded(isExpanded ? panel : null);
    };
    return (
        <div>
            {props.paymentMethods.map(({ id, card, isDefault }) => {
                return (
                    <ExpansionPanel
                        onChange={handleChange(id)}
                        expanded={expanded === id}
                        key={id}
                        variant='elevation'
                    >
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
                            <Typography
                                className={classNames([
                                    'flex width-100',
                                    { bold: isDefault },
                                ])}
                            >
                                {card.last4}
                                <span className='grow' />
                                {card.expMonthString}/{card.expYear}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='flex'>
                            <Button
                                disabled={isDefault}
                                className='grow'
                                variant='outlined'
                            >
                                Make default
                            </Button>
                            <BlockSpace />
                            <Button
                                className='grow'
                                variant='outlined'
                                color='secondary'
                            >
                                Remove
                            </Button>
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
