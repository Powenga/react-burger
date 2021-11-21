import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavLink({ to, linkClass, exact, children, ...rest }){
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

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  linkClass: PropTypes.string,
  exact: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};
