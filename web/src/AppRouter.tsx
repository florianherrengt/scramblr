import { Router, Switch, Route } from 'react-router';
import React, { Suspense, lazy } from 'react';
import { CircularProgress } from '@material-ui/core';
import { routerUri } from './config';
import { MainLayout } from './containers/MainLayout';
import { NotesPage } from './pages/Notes';
import { history } from './helpers/history';

const TagsPage = lazy(() => import('./pages/Tags'));
const PrivacyPage = lazy(() => import('./pages/Privacy'));
const SettingsPage = lazy(() => import('./pages/Settings'));
const SignInPage = lazy(() => import('./pages/SignIn'));
const SignUpPage = lazy(() => import('./pages/SignUp'));
const TermAndConditionsPage = lazy(() => import('./pages/TermAndConditions'));
const SearchPage = lazy(() => import('./pages/Search'));

export const AppRouter = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path={routerUri.signUp} exact>
                    <Suspense fallback={<CircularProgress />}>
                        <SignUpPage />
                    </Suspense>
                </Route>
                <Route path={routerUri.signIn} exact>
                    <Suspense fallback={<CircularProgress />}>
                        <SignInPage />
                    </Suspense>
                </Route>
                <Route path={routerUri.privacy} exact>
                    <Suspense fallback={<CircularProgress />}>
                        <PrivacyPage />
                    </Suspense>
                </Route>
                <Route path={routerUri.termAndConditions} exact>
                    <Suspense fallback={<CircularProgress />}>
                        <TermAndConditionsPage />
                    </Suspense>
                </Route>
                <MainLayout>
                    <Route path={routerUri.notes} exact>
                        <NotesPage />
                    </Route>
                    <Route path={routerUri.search} exact>
                        <Suspense fallback={<CircularProgress />}>
                            <SearchPage />
                        </Suspense>
                    </Route>
                    <Route path={routerUri.settings} exact>
                        <Suspense fallback={<CircularProgress />}>
                            <SettingsPage />
                        </Suspense>
                    </Route>
                    <Route path={routerUri.tags} exact>
                        <Suspense fallback={<CircularProgress />}>
                            <TagsPage />
                        </Suspense>
                    </Route>
                </MainLayout>
                <Route path='/' exact></Route>
            </Switch>
        </Router>
    );
};