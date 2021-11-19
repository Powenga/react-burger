import React from 'react';
import LoginForm from '../components/Form/LoginForm';
import styles from '../components/App/App.module.css';

export default function Login() {
  return (
    <div className={styles.main}>
      <LoginForm />
    </div>
  );
}
