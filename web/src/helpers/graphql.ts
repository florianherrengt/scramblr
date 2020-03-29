import { GraphQLClient } from 'graphql-request';
import { getSdk } from './api';

interface GraphQLError {
    response: {
        errors: Array<{
            message: string;
            extensions: { code: 'UNAUTHENTICATED' };
        }>;
    };
}

interface GraphQLErrorOptions {
    checks?: { isUnauthenticated?: boolean };
}

const defaultOptions: GraphQLErrorOptions = {
    checks: { isUnauthenticated: true },
};

export const formatGraphqlErrors = (
    { response }: GraphQLError,
    { checks }: GraphQLErrorOptions = defaultOptions,
): GraphQLErrorOptions['checks'] => {
    try {
        if (checks?.isUnauthenticated) {
            const isUnauthenticated: boolean = !!response.errors.find(
                error => error.extensions.code === 'UNAUTHENTICATED',
            );
            return {
                isUnauthenticated,
            };
        }
    } catch (error) {
        console.error(error);
    }
};

interface GetApiOptions {}

export const getApi = (_: GetApiOptions = {}) => {
    const client = new GraphQLClient('/api/graphql', {
        cache: 'no-cache',
        credentials: 'include',
    });
    return getSdk(client);
};
