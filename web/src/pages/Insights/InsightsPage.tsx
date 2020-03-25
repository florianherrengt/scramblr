import React, { useEffect } from 'react';
import { EmotionsCharts } from '../../components/';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInsights } from '../../actions';
import { RootState } from '../../reducers';
import { CircularProgress } from '@material-ui/core';

const data = [
    {
        label: 'Page A',
        positive: 4000,
        negative: 2400,
        amt: 2400,
    },
    {
        label: 'Page B',
        positive: 3000,
        negative: 1398,
        amt: 2210,
    },
    {
        label: 'Page C',
        positive: 2000,
        negative: 9800,
        amt: 2290,
    },
    {
        label: 'Page D',
        positive: 2780,
        negative: 3908,
        amt: 2000,
    },
    {
        label: 'Page E',
        positive: 1890,
        negative: 4800,
        amt: 2181,
    },
    {
        label: 'Page F',
        positive: 2390,
        negative: 3800,
        amt: 2500,
    },
    {
        label: 'Page G',
        positive: 3490,
        negative: 4300,
        amt: 2100,
    },
];
export const InsightsPage: React.SFC<{}> = () => {
    const dispatch = useDispatch();
    const insights = useSelector((state: RootState) => state.insights);

    useEffect(() => {
        dispatch(fetchInsights());
    }, [dispatch]);

    if (insights.isFetching) {
        return <CircularProgress />;
    }
    return <EmotionsCharts data={insights.insights} />;
};
