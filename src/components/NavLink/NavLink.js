import React from 'react';
import { Route, Link } from 'react-router-dom';

export function NavLink({ to, linkClass, exact, children, ...rest }) {
  const path = typeof to === 'object' ? to.pathname : to;
  return (
    <Route
      exact={exact}
      path={path}
      children={({ match }) => {
        const isActive = !!match;
        return (
          <Link to={to} className={linkClass} {...rest}>
            {typeof children === 'function' ? children(isActive) : children}
          </Link>
        );
      }}
    ></Route>
  );
}