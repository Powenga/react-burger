import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getResetCode } from '../../services/actions/user';
import Form from './Form';

export default function ForgotPasswordForm() {
  const [values, setValues] = useState({
    email: '',
  });
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

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
      dispatch(
        getResetCode(values, () => {
          history.push({
            pathname: '/reset-password',
            state: { email: values.email, from: location },
          });
        })
      );
    },
    [values, history, location, dispatch]
  );

  return (
    <Form name="forgotPassword" title="Восстановление пароля" handleSubmit={handleSumbit}>
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
