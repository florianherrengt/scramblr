import '../../styles/index.scss';
import React from 'react';
import { EmotionsCharts } from './EmotionsCharts';

export default {
    component: EmotionsCharts,
    title: 'EmotionsCharts',
};

const data = [
    {
        label: 'Mon',
        positive: 5,
        negative: 2,
    },
    {
        label: 'Tue',
        positive: 7,
        negative: 1,
    },
    {
        label: 'Wed',
        positive: 4,
        negative: 1,
    },
    {
        label: 'Thu',
        positive: 4,
        negative: 1,
    },
    {
        label: 'Fri',
        positive: 4,
        negative: 2,
    },
    {
        label: 'Sat',
        positive: 3,
        negative: 3,
    },
    {
        label: 'Sun',
        positive: 1,
        negative: 1,
    },
];

export const Default = () => (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
        <EmotionsCharts data={{ week: data, month: data, year: data }} />
    </div>
);
