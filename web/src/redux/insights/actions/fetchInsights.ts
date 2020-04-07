import { push } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../..';
import { routerUri } from '../../../config';
import {
    formatGraphqlErrors,
    getApi,
    GetInsightsQuery,
} from '../../../helpers';
import { enqueueSnackbar } from '../../notifier/actions/enqueueSnackbar';
import { SharedActions } from '../../shared';

export interface FetchInsightsActionFetching {
    type: 'GET_INSIGHTS_REQUEST';
}

export interface FetchInsightsActionSuccess {
    type: 'GET_INSIGHTS_SUCCESS';
    insights: GetInsightsQuery['insights'];
}

export interface FetchInsightsActionError {
    type: 'GET_INSIGHTS_FAILURE';
}

export type InsightsAction =
    | SharedActions
    | FetchInsightsActionFetching
    | FetchInsightsActionSuccess
    | FetchInsightsActionError;

export const fetchInsights = () => async (
    dispatch: ThunkDispatch<{}, {}, InsightsAction>,
    getState: () => RootState,
) => {
    const api = getApi();

    dispatch({ type: 'GET_INSIGHTS_REQUEST' });
    try {
        const { insights } = await api.getInsights();
        dispatch({
            type: 'GET_INSIGHTS_SUCCESS',
            insights,
        });
    } catch (error) {
        dispatch({
            type: 'GET_INSIGHTS_FAILURE',
        });
        if (formatGraphqlErrors(error)?.isUnauthenticated) {
            console.debug('Unauthenticated. Redirect to sign in');
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            dispatch(push(routerUri.signIn));
            return;
        }
        console.log(error);
        const errorMessage = 'Error fetching insights';
        dispatch(
            enqueueSnackbar({
                message: errorMessage,
                options: { variant: 'error' },
            }),
        );
    }
};
