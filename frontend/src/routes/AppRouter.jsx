import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import { CircularProgress } from '@material-ui/core';
import MainLayout from '../components/Layout';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { getCookie } from '../utils/cookie';
import actions from '../redux/actions';
import appRoutes from './appRoutes';

const PrivateApp = () => {
  const privateRoutes = Object.keys(appRoutes).filter(
    (route) => appRoutes[route].private,
  );

  return (
    <MainLayout>
      <Switch>
        {privateRoutes.map((privateRoute) => (
          <PrivateRoute
            path={appRoutes[privateRoute].url}
            component={appRoutes[privateRoute].component}
            exact
            key={appRoutes[privateRoute].url}
          />
        ))}
        <Redirect to="/dashboard" />
      </Switch>
    </MainLayout>
  );
};

const AppRouter = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);

  const { accessToken, verifying } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!nprogress.isStarted()) nprogress.start();

  useEffect(() => {
    nprogress.done();
  });

  useEffect(() => {
    if (!accessToken) {
      const accessTokenFromCookie = getCookie('accessToken');
      if (accessTokenFromCookie) {
        dispatch(actions.auth.verifyToken(accessTokenFromCookie));
      }
    }

    setIsFirstTime(false);
  }, []);

  if (isFirstTime || verifying) {
    return <CircularProgress />;
  }

  const publicRoutes = Object.keys(appRoutes).filter(
    (route) => !appRoutes[route].private,
  );

  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map((publicRoute) => (
          <PublicRoute
            exact
            path={appRoutes[publicRoute].url}
            component={appRoutes[publicRoute].component}
            restricted={appRoutes[publicRoute].restricted}
            key={appRoutes[publicRoute].url}
          />
        ))}

        <PrivateRoute component={PrivateApp} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
