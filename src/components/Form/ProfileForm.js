import {
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import Form from './Form';

export default function LoginForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
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
          onIconClick={(event) => {
            event.preventDefault();
          }}
        />
      </div>
    </Form>
  );
}
