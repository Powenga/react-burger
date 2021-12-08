import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/actions/user';
import { TStyle } from '../../utils/types';
import Form from './Form';

const buttonContainerStyle: TStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: 320,
};

const buttonWrapStyle = {
  flex: '0 0 20%',
};

const ProfileForm: FC = () => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { user } = useSelector((store) => store.user);

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

  const handleSumbit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(updateUser(values));
    },
    [dispatch, values]
  );

  const handleReset = useCallback(
    (event) => {
      event.preventDefault();
      setValues((state) => ({
        ...state,
        name: user.name,
        email: user.email,
        password: '',
      }));
    },
    [user]
  );

  useEffect(() => {
    setValues((state) => ({
      ...state,
      name: user.name,
      email: user.email,
      password: '',
    }));
  }, [user]);

  useEffect(() => {
    if (
      values.email !== user.email ||
      values.name !== user.name ||
      values.password !== ''
    ) {
      setIsDataChanged(true);
    } else {
      setIsDataChanged(false);
    }
  }, [values, user]);

  return (
    <Form name="profileForm" title="" handleSubmit={handleSumbit}>
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
        />
      </div>
      {isDataChanged && (
        <div style={buttonContainerStyle}>
          <div style={buttonWrapStyle}>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
          <div style={buttonWrapStyle}>
            <Button type="primary" size="medium" onClick={handleReset}>
              Отмена
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
}

export default ProfileForm;