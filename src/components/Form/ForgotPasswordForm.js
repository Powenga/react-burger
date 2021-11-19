import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default function LoginForm() {
  const [values, setValues] = React.useState({
    email: '',
  });
  const [isShownPass, setIsShownPass] = useState(false);

  const handleChange = useCallback((event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues((state) => ({
      ...state,
      [name]: value,
    }));
  }, []);

  return (
    <Form name="loginForom" title="Восстановление пароля">
      <div className="mb-6">
        <Input
          placeholder="Укажите e-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
          type="text"
          size={'default'}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{' '}
        <Link
          to="/login"
          className="text text_type_main-default text_color_accent"
          style={{ textDecoration: 'none' }}
        >
          Войти
        </Link>
      </p>
    </Form>
  );
}
