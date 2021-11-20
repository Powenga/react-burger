import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Preloader from '../../components/Preloader/Preloader';

export function ProtectedRoute({ children, ...rest }) {
  const { isLoggedIn, isUserLoaded } = useSelector((store) => store.user);

  if (!isUserLoaded) {
    return <Preloader />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};
