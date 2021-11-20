import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import LoginForm from '../components/Form/LoginForm';
import styles from '../components/App/App.module.css';

export default function Login() {
  const { isLoggedIn } = useSelector((store) => store.user);
  const location = useLocation();

  if (isLoggedIn) {
    return <Redirect to={ location.state?.from || '/' } />;
  }

  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
