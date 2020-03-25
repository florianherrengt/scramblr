import React, { useEffect } from 'react';
import { EmotionsCharts } from '../../components/';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInsights } from '../../actions';
import { RootState } from '../../reducers';
import { CircularProgress } from '@material-ui/core';

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
