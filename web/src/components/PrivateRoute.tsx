import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { fetchCurrentUser } from '../actions';
import { CircularProgress } from '@material-ui/core';

export const PrivateRoute: React.SFC<RouteProps> = ({ children, ...rest }) => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();

  dispatch(fetchCurrentUser());

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!currentUser.fetched || currentUser.isFetching) {
          return (
            <div>
              <CircularProgress />
            </div>
          );
        }

        if (!currentUser.user || currentUser.error) {
          return (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: location },
              }}
            />
          );
        }
        return children;
      }}
    />
  );
};
