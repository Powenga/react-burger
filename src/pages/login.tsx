import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import LoginForm from '../components/Form/LoginForm';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';
import { TState } from '../utils/types';

const Login: FC = () => {
  // @ts-ignore
  const { isLoggedIn, isUserLoaded } = useSelector((store) => store.user);
  const location = useLocation<TState>();

  if (isLoggedIn) {
    return <Redirect to={ location.state?.from || '/' } />;
  }

  if (!isUserLoaded) {
    return <Preloader />;
  }

  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}

export default Login;