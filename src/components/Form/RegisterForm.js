import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions/user';
import Form from './Form';

export default function RegisterForm() {
  const [values, setValues] = useState({
    name: '',
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
    dispatch(register(values));
  }, [dispatch, values]);

  return (
    <Form name="registerForom" title="Регистрация" handleSubmit={handleSumbit}>
      <div className="mb-6">
        <Input
          placeholder="Имя"
          name="name"
          value={values.name}
          onChange={handleChange}
          type="text"
          size={'default'}
        />
      </div>
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
          Зарегистрироваться
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{' '}
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
