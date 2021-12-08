import React, { FC } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterForm from '../components/Form/RegisterForm';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';
import { TState } from '../utils/types';

const Register: FC = () => {
  // @ts-ignore
  const { isLoggedIn, isUserLoaded } = useSelector((store) => store.user);
  const location = useLocation<TState>();

  if (isLoggedIn) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  if (!isUserLoaded) {
    return <Preloader />;
  }

  return (
    <main className={styles.main}>
      <RegisterForm />
    </main>
  );
}

export default Register;
