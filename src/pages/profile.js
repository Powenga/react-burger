import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProfileForm from '../components/Form/ProfileForm';
import NavLink from '../components/NavLink/NavLink';
import styles from '../components/App/App.module.css';
import { logout } from '../services/actions/user';

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
  const history = useHistory();
  const dispatch = useDispatch();

  function handleExit(event) {
    event.preventDefault();
    dispatch(
      logout(() => {
        history.replace('/login');
      })
    );
  }

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
              <button
                onClick={handleExit}
                className="text text text_type_main-medium text_color_inactive"
                style={{
                  ...navLinkStyle,
                  color: '#8585AD',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              >
                Выход
              </button>
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
