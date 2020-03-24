import React from 'react';
import { Chip, ChipProps, useTheme } from '@material-ui/core';
import classNames from 'classnames';
import { TagEmotion } from '../../helpers';

interface TagChipProps extends ChipProps {
    tag: {
        label?: string | null | undefined;
        emotion?: string | null | undefined;
    };
}

export const TagChip: React.SFC<TagChipProps> = props => {
    const theme = useTheme();
    return (
        <Chip
            classes={{
                root: classNames([
                    'TagChip',
                    {
                        'TagChip--positive':
                            props.tag.emotion === TagEmotion.positive,
                        'TagChip--negative':
                            props.tag.emotion === TagEmotion.negative,
                        'TagChip--neutral':
                            props.tag.emotion === TagEmotion.neutral,
                    },
                ]),
            }}
            style={{ borderColor: theme.palette.success.main }}
            variant='outlined'
            label={props.tag.label}
            {...props}
        />
    );
};
