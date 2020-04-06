import {
    Button,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { PaymentMethod } from '../../helpers';
import { BlockSpace } from '../BlockSpace/';
import { SettingsProps } from './Settings';

interface PaymentMethodListProps {
    onDeletePaymentMethod: SettingsProps['onDeletePaymentMethod'];
    onUpdateDefaultPaymentMethod: SettingsProps['onUpdateDefaultPaymentMethod'];
    paymentMethods: PaymentMethod[];
}
export const PaymentMethodList: React.SFC<PaymentMethodListProps> = props => {
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
                                onClick={() =>
                                    props.onUpdateDefaultPaymentMethod(id)
                                }
                                className='grow'
                                variant='outlined'
                            >
                                Make default
                            </Button>
                            <BlockSpace />
                            <Button
                                onClick={() => props.onDeletePaymentMethod(id)}
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
