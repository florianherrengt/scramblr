import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Tooltip,
} from '@material-ui/core';
import {
    SentimentDissatisfied as SentimentDissatisfiedOutlinedIcon,
    SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
    SentimentVerySatisfied as SentimentVerySatisfiedIcon,
    Stars as StarsIcon,
} from '@material-ui/icons';
import React from 'react';

interface MoodSelectorProps {}

export const MoodSelector: React.SFC<MoodSelectorProps> = props => {
    return (
        <Card className='MoodSelector'>
            <CardHeader
                title='How was test your day?'
                className='MoodSelector_CardHeader text-center'
            />
            <CardContent className='MoodSelector_Card_CardContent'>
                <Tooltip title='Bad'>
                    <Button>
                        <SentimentVeryDissatisfiedIcon className='MoodIcon MoodIcon--very-dissatisfied' />
                    </Button>
                </Tooltip>
                <Tooltip title='Meh'>
                    <Button>
                        <SentimentDissatisfiedOutlinedIcon className='MoodIcon MoodIcon--dissatisfied' />
                    </Button>
                </Tooltip>
                <Tooltip title='Good'>
                    <Button>
                        <SentimentVerySatisfiedIcon className='MoodIcon MoodIcon--satisfied' />
                    </Button>
                </Tooltip>
                <Tooltip title='Special'>
                    <Button>
                        <StarsIcon className='MoodIcon MoodIcon--special' />
                    </Button>
                </Tooltip>
            </CardContent>
        </Card>
    );
};
