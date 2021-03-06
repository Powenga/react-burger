import React, { FC } from 'react';
import { useSelector } from '../hooks';
import { Redirect, useLocation } from 'react-router-dom';
import LoginForm from '../components/Form/LoginForm';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';
import { TLocationState } from '../utils/types';

const Login: FC = () => {
  const { isLoggedIn, isUserLoaded } = useSelector((store) => store.user);
  const location = useLocation<TLocationState>();

  if (isLoggedIn) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  if (!isUserLoaded) {
    return <Preloader />;
  }

  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
};

export default Login;
