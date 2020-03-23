import { GraphQLClient } from 'graphql-request';
import { getSdk } from './api';

export const graphqlClient = new GraphQLClient(
  '/api/graphql',
  {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  },
);

export const api = getSdk(graphqlClient);
