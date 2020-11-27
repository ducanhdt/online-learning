import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PublicRoute({ component: Component, ...rest }) {
  const { accessToken } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;
