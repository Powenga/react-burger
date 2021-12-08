import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { TPath } from '../../utils/types';
import Preloader from '../Preloader/Preloader';

type TProtectedRoute = {
  path: TPath;
};

const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
  // @ts-ignore
  const { isLoggedIn, isUserLoaded } = useSelector((store) => store.user);

  if (!isUserLoaded) {
    return <Preloader />;
  }

  return (

    // @ts-ignore
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
};

export default ProtectedRoute;
