import React, { FC } from 'react';
import { useSelector } from '../hooks';
import { Redirect, useLocation } from 'react-router-dom';
import ForgotPasswordForm from '../components/Form/ForgotPasswordForm';
import Preloader from '../components/Preloader/Preloader';
import { TLocationState } from '../utils/types';
import styles from '../components/App/App.module.css';

const ForgotPassword: FC = () => {
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
      <ForgotPasswordForm />
    </main>
  );
};

export default ForgotPassword;
