import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from '../../redux';
import { fetchCurrentUser } from '../../redux/actions';

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
