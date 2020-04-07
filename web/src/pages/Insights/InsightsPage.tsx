import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmotionsCharts } from '../../components/';
import { RootState } from '../../redux';
import { fetchInsights } from '../../redux/actions';

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
