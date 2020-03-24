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
    if (checks?.isUnauthenticated) {
        const isUnauthenticated: boolean = !!response.errors.find(
            error => error.extensions.code === 'UNAUTHENTICATED',
        );
        return {
            isUnauthenticated,
        };
    }
};

interface GetApiOptions {
    token?: string;
}

export const getApi = ({ token }: GetApiOptions = {}) => {
    const client = new GraphQLClient('/api/graphql', {
        headers: Object.assign(
            {},
            token ? { authorization: `Bearer ${token}` } : null,
        ),
        cache: 'no-cache',
        credentials: 'omit',
    });
    return getSdk(client);
};
