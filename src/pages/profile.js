import React from 'react';
import ProfileForm from '../components/Form/ProfileForm';
import styles from '../components/App/App.module.css';
import { NavLink } from '../components/NavLink/NavLink';


const navLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: 64,
  minWidth: 320,
};

export default function Profile() {
  return (
    <main className={`${styles.main} ${styles['main_type_profile']}`}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <nav className="mb-20">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <NavLink to="/profile" style={navLinkStyle} exact={true}>
                {(isActive) => (
                  <span
                    className={`text text_type_main-medium ${
                      !isActive && 'text_color_inactive'
                    }`}
                  >
                    Профиль
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              {' '}
              <NavLink to="/profile/history" style={navLinkStyle}>
                {(isActive) => (
                  <span
                    className={`text text text_type_main-medium ${
                      !isActive && 'text_color_inactive'
                    }`}
                  >
                    История заказов
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              {' '}
              <NavLink to="/profile/exit" style={navLinkStyle}>
                {(isActive) => (
                  <span
                    className={`text text text_type_main-medium ${
                      !isActive && 'text_color_inactive'
                    }`}
                  >
                    Выход
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className="text text_type_main-default text_color_inactive ">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <ProfileForm />
    </main>
  );
}
