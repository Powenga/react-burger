import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import ForgotPasswordForm from '../components/Form/ForgotPasswordForm';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';

export default function ForgotPassword() {
  const { isLoggedIn, isUserLoaded } = useSelector((store) => store.user);
  const location = useLocation();

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
}
