import React from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${styles.header} pt-4 pb-4`}>
        <div className={styles.container}>
          <nav className={styles.navigation}>
            <a href="/" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default pl-2">Конструктор</span>
            </a>
            <a href="/" className={`${styles.link} ml-2 pl-5 pr-5 pt-4 pb-4`}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default pl-2 text_color_inactive">Лента&nbsp;заказов</span>
            </a>
          </nav>
          <Logo />
          <nav className={ styles.profileWrap}>
            <a href="/" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default pl-2 text_color_inactive">Личный&nbsp;кабинет</span>
            </a>
          </nav>
        </div>
      </header>
    )
  }
};

export default AppHeader;