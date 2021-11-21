import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from '../NavLink/NavLink';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  const returnLinkContent = useCallback((isActive, IconComponent, text) => {
    return (
      <>
        <IconComponent type={isActive ? 'primary' : 'secondary'} />
        <span
          className={`text text_type_main-default pl-2 ${
            !isActive && 'text_color_inactive'
          }`}
        >
          {text}
        </span>
      </>
    );
  }, []);

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <nav className={styles.navigation}>
          <NavLink
            to="/"
            exact={true}
            className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}
          >
            {(isActive) =>
              returnLinkContent(isActive, BurgerIcon, 'Конструктор')
            }
          </NavLink>
          <NavLink
            to="/orders"
            className={`${styles.link} ml-2 pl-5 pr-5 pt-4 pb-4`}
          >
            {(isActive) =>
              returnLinkContent(isActive, ListIcon, 'Лента заказов')
            }
          </NavLink>
        </nav>
        <Link to="/">
          <Logo />
        </Link>
        <nav className={styles.profileWrap}>
          <NavLink
            to="/profile"
            className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}
          >
            {(isActive) =>
              returnLinkContent(isActive, ProfileIcon, 'Личный кабинет')
            }
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
