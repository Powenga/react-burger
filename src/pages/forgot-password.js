import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import ForgotPasswordForm from '../components/Form/ForgotPasswordForm';
import styles from '../components/App/App.module.css';

export default function ForgotPassword() {
  const { isLoggedIn, isUserLoaded } = useSelector((store) => store.user);
  const location = useLocation();

  if (isLoggedIn) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  if (!isUserLoaded) {
    return null;
  }

  return (
    <main className={styles.main}>
      <ForgotPasswordForm />
    </main>
  );
}
