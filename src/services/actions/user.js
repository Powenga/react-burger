import auth from '../../utils/auth';
import {
  ACCESS_COOKIE_EXPIRES,
  REFRESH_COOKIE_EXPIRES,
} from '../../utils/constants';
import { setCookie, deleteCookie } from '../../utils/utils';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_REQUEST_FAILED = 'USER_REQUEST_FAILED';
export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

function saveCokies(accessToken, refreshToken) {
  try {
    setCookie('accessToken', accessToken.split('Bearer ')[1], {
      expires: ACCESS_COOKIE_EXPIRES,
    });
    setCookie('refreshToken', refreshToken, {
      expires: REFRESH_COOKIE_EXPIRES,
    });
  } catch (error) {
    throw new Error();
  }
}

export function login(data) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    auth
      .login(data)
      .then((res) => {
        const { accessToken, refreshToken, user } = res;
        saveCokies(accessToken, refreshToken);
        dispatch({
          type: USER_REQUEST_SUCCESS,
          user,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_REQUEST_FAILED,
        });
      });
  };
}

export function register(data) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    auth
      .register(data)
      .then((res) => {
        const { accessToken, refreshToken, user } = res;
        saveCokies(accessToken, refreshToken);
        dispatch({
          type: USER_REQUEST_SUCCESS,
          user,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_REQUEST_FAILED,
        });
      });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    auth
      .getUser()
      .then((res) => {
        const { user } = res;
        dispatch({
          type: USER_REQUEST_SUCCESS,
          user,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_REQUEST_FAILED,
        });
      });
  };
}

export function updateUser(data) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    auth
      .updateUser(data)
      .then((res) => {
        const { user } = res;
        dispatch({
          type: USER_REQUEST_SUCCESS,
          user,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_REQUEST_FAILED,
        });
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    auth
      .logout()
      .then(() => {
        try {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        } catch (error) {
          throw new Error('Не удалось удалить куки!')
        }
        dispatch({
          type: USER_LOGOUT_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: USER_REQUEST_FAILED,
        });
      });
  };
}
