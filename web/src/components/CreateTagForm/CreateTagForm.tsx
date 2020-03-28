import {
    Button,
    MenuItem,
    Select,
    TextField,
    useTheme,
    useMediaQuery,
} from '@material-ui/core';
import React, { useState } from 'react';
import { TagEmotion } from '../../helpers';
import classNames from 'classnames';
import { LineSpacer } from '../LineSpacer';

interface SubmitValues {
    label: string;
    emotion: string;
}

interface CreateTagFormProps {
    onSubmit(values: SubmitValues): void;
}

export const CreateTagForm: React.SFC<CreateTagFormProps> = props => {
    const [label, setLabel] = useState<string>('');
    const [emotion, setEmotion] = useState<TagEmotion>(TagEmotion.neutral);
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
                    Add
                </Button>
            </div>
        </form>
    );
};
