import React, { FC, ReactElement } from 'react';
import { Route, Link } from 'react-router-dom';
import { TStyle } from '../../utils/types';

type TNavLink = {
  to: '/profile' | '/profile/orders' | { pathname: 'string' },
  linkClass?: string,
  exact?: boolean,
  children: (isActive: boolean) => ReactElement | ReactElement,
  style: TStyle,
}

const NavLink: FC<TNavLink> = ({ to, linkClass, style, exact, children, ...rest }) => {
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

export default NavLink;