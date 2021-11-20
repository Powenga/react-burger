import React from 'react';
import styles from './Form.module.css';

export default function Form({ name, title, children }) {
  return (
    <form name={name} noValidate className={styles.form}>
      {title && <h1 className={`text text_type_main-medium mb-6`}>{title}</h1>}
      {children}
    </form>
  );
}
