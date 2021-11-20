import {
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../services/actions/user';
import Form from './Form';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { user, request, requesFailed } = useSelector((store) => store.user);

   const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    password: '',
  });

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
    dispatch(updateUser(values));
  }, [dispatch, values]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setValues((state) => ({
      ...state,
      name: user.name,
      email: user.email,
    }));
  }, [ user]);

  return (
    <Form name="profileForm" title="">
      <div className="mb-6">
        <Input
          placeholder="Имя"
          name="name"
          value={values.name}
          onChange={handleChange}
          type="text"
          size={'default'}
          icon="EditIcon"
          onIconClick={handleSumbit}
        />
      </div>
      <div className="mb-6">
        <Input
          placeholder="Логин"
          name="email"
          value={values.email}
          onChange={handleChange}
          type="text"
          size={'default'}
          icon="EditIcon"
          onIconClick={handleSumbit}
        />
      </div>
      <div className="mb-6">
        <Input
          placeholder="Пароль"
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          size={'default'}
          icon="EditIcon"
          onIconClick={handleSumbit}
        />
      </div>
    </Form>
  );
}
