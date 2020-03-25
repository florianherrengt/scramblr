import { InsightsAction } from '../actions';
import { GetInsightsQuery } from '../helpers';

export interface InsightsState {
    insights: GetInsightsQuery['insights']
    isFetching: boolean;
    error?: string;
    fetched: boolean;
}

const defaultState: InsightsState = {
    insights: { week: [], month: [], year: [] },
    isFetching: false,
    fetched: false,
};

export const insights = (
    state: InsightsState = defaultState,
    action: InsightsAction,
): InsightsState => {
    switch (action.type) {
        case 'GET_INSIGHTS_REQUEST':
            return {
                ...state,
                ...action,
                isFetching: true,
            };
        case 'GET_INSIGHTS_SUCCESS':
            return {
                ...state,
                insights: action.insights,
                fetched: true,
                isFetching: false,
            };
        case 'GET_INSIGHTS_FAILURE':
            return { ...state, ...action, fetched: true, isFetching: false };

        default:
            return state;
    }
};