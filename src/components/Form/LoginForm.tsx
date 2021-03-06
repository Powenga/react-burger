import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/actions/user';
import Form from './Form';

const LoginForm: FC = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [isShownPass, setIsShownPass] = useState(false);
  const dispatch = useDispatch();

  const handleChange = useCallback((event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues((state) => ({
      ...state,
      [name]: value,
    }));
  }, []);

  const handleSumbit = useCallback((event) => {
    event.preventDefault();
    dispatch(login(values));
  }, [dispatch, values]);

  return (
    <Form name="loginForom" title="Вход" handleSubmit={handleSumbit}>
      <div className="mb-6">
        <Input
          placeholder="E-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
          type="text"
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          placeholder="Пароль"
          name="password"
          value={values.password}
          onChange={handleChange}
          type={isShownPass ? 'text' : 'password'}
          size={'default'}
          icon={isShownPass ? 'HideIcon' : 'ShowIcon'}
          onIconClick={(event) => {
            event.preventDefault();
            setIsShownPass(!isShownPass);
          }}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <p className="mb-4 text text_type_main-default text_color_inactive">
        Вы — новый пользователь?{' '}
        <Link
          to="/register"
          className="text text_type_main-default text_color_accent"
          style={{ textDecoration: 'none' }}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link
          to="/forgot-password"
          className="text text_type_main-default text_color_accent"
          style={{ textDecoration: 'none' }}
        >
          Восстановить пароль
        </Link>
      </p>
    </Form>
  );
}

export default LoginForm;