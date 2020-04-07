import { Backdrop, CircularProgress, useTheme } from '@material-ui/core';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router';
import { routerUri } from './config';
import { MainLayout } from './containers/MainLayout';
import { history } from './helpers/history';
import { NotesPage } from './pages/Notes';
import { RootState } from './redux';

const TagsPage = lazy(() => import('./pages/Tags'));
const PrivacyPage = lazy(() => import('./pages/Privacy'));
const SettingsPage = lazy(() => import('./pages/Settings'));
const SignInPage = lazy(() => import('./pages/SignIn'));
const SignUpPage = lazy(() => import('./pages/SignUp'));
const TermAndConditionsPage = lazy(() => import('./pages/TermAndConditions'));
const SearchPage = lazy(() => import('./pages/Search'));
const InsightsPage = lazy(() => import('./pages/Insights'));

export const AppRouter = () => {
    const theme = useTheme();
    const appState = useSelector((state: RootState) => state.appState);
    return (
        <Router history={history}>
            <Backdrop
                style={{ zIndex: theme.zIndex.drawer + 1 }}
                open={appState.loading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
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
                    <Route path={routerUri.insights} exact>
                        <Suspense fallback={<CircularProgress />}>
                            <InsightsPage />
                        </Suspense>
                    </Route>
                    <Route path={routerUri.paymentFailed} exact>
                        <Suspense fallback={<CircularProgress />}>
                            <div>
                                Payment failed. Please contact the support to
                                resolve the issue.
                            </div>
                        </Suspense>
                    </Route>
                    <Route path='/' exact>
                        <Redirect to={routerUri.notes} />
                    </Route>
                </MainLayout>
            </Switch>
        </Router>
    );
};
