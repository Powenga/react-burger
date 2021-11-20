import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterForm from '../components/Form/RegisterForm';
import styles from '../components/App/App.module.css';

export default function Register() {
  const { isLoggedIn } = useSelector((store) => store.user);
  const location = useLocation();

  if (isLoggedIn) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <main className={styles.main}>
      <RegisterForm />
    </main>
  );
}
