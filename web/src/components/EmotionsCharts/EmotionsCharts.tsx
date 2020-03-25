import React from 'react';
import { BarEmotionsCharts } from './BarEmotionChart';
import { Typography } from '@material-ui/core';
import { LineSpacer } from '../LineSpacer';
import { InsightData } from '../../helpers/';

export type EmotionData = Omit<InsightData, '__typename'>;

interface EmotionsChartsProps {
    data: {
        week: EmotionData[];
        month: EmotionData[];
        year: EmotionData[];
    };
}

export const EmotionsCharts: React.SFC<EmotionsChartsProps> = props => {
    console.log(props.data.week);
    return (
        <div className='EmotionsCharts width-100'>
            <LineSpacer />
            <Typography variant='h6' className='text-center'>
                This Week
            </Typography>
            <BarEmotionsCharts data={props.data.week} />
            <LineSpacer />
            <Typography variant='h6' className='text-center'>
                This Month
            </Typography>
            <BarEmotionsCharts data={props.data.month} />
            <LineSpacer />
            <Typography variant='h6' className='text-center'>
                This Year
            </Typography>
            <BarEmotionsCharts data={props.data.year} />
        </div>
    );
};
