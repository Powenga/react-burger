import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../utils/api';
import Form from './Form';

export default function ResetPasswordForm() {
  const [values, setValues] = useState({
    password: '',
    token: '',
  });
  const [isShownPass, setIsShownPass] = useState(false);
  const history = useHistory();

  const handleChange = useCallback((event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues((state) => ({
      ...state,
      [name]: value,
    }));
  }, []);

  const handleSumbit = useCallback(
    (event) => {
      event.preventDefault();
      api.resetPassword(values).then(() => {
        history.push({ pathname: '/login' });
      });
    },
    [values, history]
  );

  return (
    <Form name="loginForom" title="Восстановление пароля">
      <div className="mb-6">
        <Input
          placeholder="Введите новый пароль"
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
      <div className="mb-6">
        <Input
          placeholder="Введите код из письма"
          name="token"
          value={values.token}
          onChange={handleChange}
          type="text"
          size={'default'}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium" onClick={handleSumbit}>
          Сохранить
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
