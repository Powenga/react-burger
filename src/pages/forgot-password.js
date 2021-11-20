import React from 'react';
import ForgotPasswordForm from '../components/Form/ForgotPasswordForm';
import styles from '../components/App/App.module.css';

export default function ForgotPassword() {
  return (
    <main className={styles.main}>
      <ForgotPasswordForm />
    </main>
  );
}