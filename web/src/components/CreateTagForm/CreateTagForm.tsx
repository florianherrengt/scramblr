import {
    Button,
    MenuItem,
    Select,
    TextField,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import { ValuesType } from 'utility-types';
import { TagEmotion } from '../../helpers';
import { RootState } from '../../redux';
import { LineSpacer } from '../LineSpacer';

interface SubmitValues {
    label: string;
    emotion: string;
}

export interface CreateTagFormProps {
    tag?: ValuesType<RootState['currentUserTags']['tags']>;
    submitLabel?: string;
    onSubmit(values: SubmitValues): void;
}

export const CreateTagForm: React.SFC<CreateTagFormProps> = props => {
    const [label, setLabel] = useState<string>(props.tag?.label || '');
    const [emotion, setEmotion] = useState<TagEmotion>(
        props.tag?.emotion || TagEmotion.neutral,
    );
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <form
            className={classNames(['CreateTagForm', { flex: isDesktop }])}
            onSubmit={event => {
                event.preventDefault();
                props.onSubmit({ label, emotion });
                setLabel('');
            }}
        >
            <TextField
                className='CreateTagForm_TextField_Label width-100'
                autoFocus
                value={label}
                onChange={event => setLabel(event.target.value)}
                style={{ flex: 1 }}
                variant='outlined'
                placeholder='Label'
            />
            {!isDesktop && <LineSpacer />}
            <div className='flex'>
                <Select
                    variant='outlined'
                    autoWidth
                    style={{ width: isDesktop ? 200 : '100%' }}
                    SelectDisplayProps={{
                        style: { display: 'flex' },
                    }}
                    value={emotion}
                    onChange={event =>
                        setEmotion(event.target.value as TagEmotion)
                    }
                >
                    <MenuItem value={TagEmotion.positive}>
                        <div
                            className='CreateTagForm_Select_emotion'
                            style={{
                                backgroundColor: theme.palette.success.main,
                            }}
                        ></div>
                        Positive
                    </MenuItem>
                    <MenuItem value={TagEmotion.neutral}>
                        <div
                            className='CreateTagForm_Select_emotion'
                            style={{
                                backgroundColor: theme.palette.grey[400],
                            }}
                        ></div>
                        Neutral
                    </MenuItem>
                    <MenuItem value={TagEmotion.negative}>
                        <div
                            className='CreateTagForm_Select_emotion'
                            style={{
                                backgroundColor: theme.palette.error.main,
                            }}
                        ></div>
                        Negative
                    </MenuItem>
                </Select>
                <Button className='CreateTagForm_Button_Submit' type='submit'>
                    {props.submitLabel || 'Add'}
                </Button>
            </div>
        </form>
    );
};
