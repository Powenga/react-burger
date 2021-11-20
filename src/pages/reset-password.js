import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import ResetPasswordForm from '../components/Form/ResetPasswordForm';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';

export default function ResetPassword() {
  const { isLoggedIn, isUserLoaded } = useSelector((store) => store.user);
  const location = useLocation();

  if (isLoggedIn) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  if (
    location.state?.from?.pathname !== '/forgot-password' ||
    !location.state?.email
  ) {
    return <Redirect to="/forgot-password" />;
  }

  if (!isUserLoaded) {
    return <Preloader />;
  }

  return (
    <div className={styles.main}>
      <ResetPasswordForm />
    </div>
  );
}
