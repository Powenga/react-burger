import auth from '../../utils/auth';
import { setCookie } from '../../utils/utils';

export const LOGIN_REQUEST = 'LOGIN';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

export const REGISTER_REQUEST = 'REGISTER';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';

export function login(data) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    auth
      .login(data)
      .then((res) => {
        dispatch({
          type: LOGIN_REQUEST_SUCCESS,
          user: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_REQUEST_FAILED,
        });
      });
  };
}

export function register(data) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    auth
      .register(data)
      .then((res) => {
        const { refreshToken } = res;
        setCookie('refreshToken', refreshToken);
        dispatch({
          type: REGISTER_REQUEST_SUCCESS,
          user: { ...res.user, accessToken: res.accessToken},
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_REQUEST_FAILED,
        });
      });
  };
}