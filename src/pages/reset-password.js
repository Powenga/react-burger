import React from 'react';
import ResetPasswordForm from '../components/Form/ResetPasswordForm';
import styles from '../components/App/App.module.css';

export default function ResetPassword() {
  return (
    <div className={styles.main}>
      <ResetPasswordForm />
    </div>
  );
}