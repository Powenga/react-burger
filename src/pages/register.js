import React from 'react';
import RegisterForm from '../components/Form/RegisterForm';
import styles from '../components/App/App.module.css';

export default function Register() {
  return (
    <main className={styles.main}>
      <RegisterForm />
    </main>
  );
}
