import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { QueryResult, MutationResult } from '@apollo/react-common';

interface LoadingOrErrorProps {
  results: QueryResult | MutationResult;
}

export const LoadingOrError: React.SFC<LoadingOrErrorProps> = props => {
  if (props.results.loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (props.results.error) {
    return (
      <div>
        {props.results.error?.graphQLErrors.map(({ message }) => (
          <Typography color='error'>{message}</Typography>
        ))}
      </div>
    );
  }
  return <div>{props.children}</div>;
};
