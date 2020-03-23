import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { fetchCurrentUserNotes, fetchCurrentUserTags } from './actions';
import './App.css';
import { PrivateRoute } from './components/PrivateRoute';
import { localStorageKeys } from './config';
import { routerUri } from './config/routerUri';
import { MainLayout } from './pages/Layout';
import { NotesPage } from './pages/Notes';
import { PrivacyPage } from './pages/Privacy';
import { SettingsPage } from './pages/Settings';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { TagsPage } from './pages/Tags';
import { TnCPage } from './pages/TnC';
import { configureStore } from './store';
import { deviceInfo } from './helpers';

const store = configureStore({
  currentUser: {
    aesPassphrase:
      localStorage.getItem(localStorageKeys.aesPassphrase) || undefined,
    fetched: false,
    isFetching: false,
  },
});

const FetchData: React.SFC<{}> = () => {
  const dispatch = useDispatch();

  (async () => {
    await Promise.all([
      dispatch(fetchCurrentUserNotes({ variables: { limit: 10 } })),
      dispatch(fetchCurrentUserTags()),
    ]);
    if (deviceInfo.isMobile) {
      return;
    }
    dispatch(
      fetchCurrentUserNotes({
        variables: { skip: 10, limit: 100 },
        forceReload: true,
      }),
    );
  })();

  return <div />;
};

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <FetchData />

        <Router>
          <Switch>
            <Route path={routerUri.signUp}>
              <SignUpPage />
            </Route>
            <Route path={routerUri.signIn}>
              <SignInPage />
            </Route>
            <Route path={routerUri.privacy}>
              <PrivacyPage />
            </Route>
            <Route path={routerUri.termAndConditions}>
              <TnCPage />
            </Route>
            <MainLayout>
              <PrivateRoute path={routerUri.notes}>
                <NotesPage />
              </PrivateRoute>
              <PrivateRoute path={routerUri.settings}>
                <SettingsPage />
              </PrivateRoute>
              <PrivateRoute path={routerUri.tags}>
                <TagsPage />
              </PrivateRoute>
              <Route path='/'>
                <Redirect to={routerUri.notes} />
              </Route>
            </MainLayout>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
