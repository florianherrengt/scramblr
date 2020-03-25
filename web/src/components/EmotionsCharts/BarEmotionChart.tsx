import { useTheme } from '@material-ui/core';
import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { EmotionData } from './EmotionsCharts';

interface BarEmotionsChartsProps {
    data: EmotionData[];
}

export const BarEmotionsCharts: React.SFC<BarEmotionsChartsProps> = props => {
    const theme = useTheme();
    return (
        <ResponsiveContainer>
            <BarChart
                data={props.data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='label' />
                <YAxis />
                <Tooltip />
                <Bar
                    dataKey='positive'
                    // name='Positive'
                    stackId='a'
                    fill={theme.palette.success.main}
                />
                <Bar
                    dataKey='negative'
                    // name='Negative'
                    stackId='a'
                    fill={theme.palette.error.main}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};
