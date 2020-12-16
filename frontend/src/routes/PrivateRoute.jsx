import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const { accessToken, isAdmin } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (accessToken) {
          // console.log({isAdmin, path:props.location.pathname});
          if (isAdmin && ['/dashboard'].includes(props.location.pathname)) {
            return <Redirect to="/admins/accounts" />;
          }
          if (!isAdmin && props.location.pathname.includes('/admins')) {
            //console.log("true");
            return <Redirect to="/dashboard" />;
          }
          return <Component {...props} accessToken={accessToken} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRoute;
