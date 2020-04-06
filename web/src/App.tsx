import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React, { lazy, Suspense, Fragment } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import './App.css';
import { AppRouter } from './AppRouter';
import { localStorageKeys } from './config';
import { configureStore } from './store';
import { theme } from './theme';

const Notifier = lazy(() => import('./pages/Notifier'));

const store = configureStore({
    currentUser: {
        aesPassphrase:
            localStorage.getItem(localStorageKeys.aesPassphrase) || undefined,
        fetched: false,
        isFetching: false,
    },
});

function App() {
    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ReduxProvider store={store}>
                    <SnackbarProvider>
                        <Fragment>
                        <Suspense fallback={<div />}>
                            <Notifier />
                        </Suspense>
                        <AppRouter />
                        </Fragment>
                    </SnackbarProvider>
                </ReduxProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
