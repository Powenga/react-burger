import React, { FC, SyntheticEvent } from 'react';
import styles from './Form.module.css';

type TForm ={
  name: string;
  title: string;
  handleSubmit: (event: SyntheticEvent) => void;
};

const Form: FC<TForm> = ({ name, title, handleSubmit, children }) => {
  return (
    <form
      name={name}
      noValidate
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {title && <h1 className={`text text_type_main-medium mb-6`}>{title}</h1>}
      {children}
    </form>
  );
};

export default Form;
