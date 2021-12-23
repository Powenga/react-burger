import auth from '../../utils/auth';
import api from '../../utils/api';
import {
  ACCESS_COOKIE_EXPIRES,
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_SUCCESS,
  REFRESH_COOKIE_EXPIRES,
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS,
  USER_LOGOUT_SUCCESS,
  GET_RESET_CODE_SUCCESS,
  RESET_PASSWORD_SUCCESS,
} from '../../utils/constants';
import { setCookie, deleteCookie } from '../../utils/utils';
import { TUser } from '../../utils/types';

export interface IGetUserRequestFailed {
  readonly type: typeof GET_USER_REQUEST_FAILED;
}
export interface IGetUserRequestSuccess {
  readonly type: typeof GET_USER_REQUEST_SUCCESS;
  readonly user: TUser;
}
export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
}
export interface IUserRequestFailed {
  readonly type: typeof USER_REQUEST_FAILED;
}
export interface IUserRequestSuccess {
  readonly type: typeof USER_REQUEST_SUCCESS;
  readonly user: TUser;
}
export interface IUserLogoutSuccess {
  readonly type: typeof USER_LOGOUT_SUCCESS;
}
export interface IGetResetCodeSuccess {
  readonly type: typeof GET_RESET_CODE_SUCCESS;
}
export interface IResetPassworSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export type TUserActions =
  | IGetUserRequestFailed
  | IGetUserRequestSuccess
  | IUserRequest
  | IUserRequestFailed
  | IUserRequestSuccess
  | IUserLogoutSuccess
  | IGetResetCodeSuccess
  | IResetPassworSuccess;

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
    return auth
      .getUser()
      .then((res) => {
        const { user } = res;
        dispatch({
          type: GET_USER_REQUEST_SUCCESS,
          user,
        });
      })
      .catch((error) => {
        if (error.message === 'jwt malformed') {
          return auth
            .refreshToken()
            .then(({ accessToken, refreshToken }) => {
              saveCokies(accessToken, refreshToken);
              dispatch(getUser());
            })
            .catch((error) => {
              return Promise.reject(error);
            });
        }
        return Promise.reject(error);
      })
      .catch(() => {
        dispatch({
          type: GET_USER_REQUEST_FAILED,
        });
      });
  };
}

export function updateUser(data) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    return auth
      .updateUser(data)
      .then((res) => {
        const { user } = res;
        dispatch({
          type: USER_REQUEST_SUCCESS,
          user,
        });
      })
      .catch((error) => {
        if (error.message === 'jwt malformed') {
          return auth
            .refreshToken()
            .then(({ accessToken, refreshToken }) => {
              saveCokies(accessToken, refreshToken);
              dispatch(updateUser(data));
            })
            .catch((error) => {
              return Promise.reject(error);
            });
        }
        return Promise.reject(error);
      })
      .catch(() => {
        dispatch({
          type: USER_REQUEST_FAILED,
        });
      });
  };
}

export function logout(callback) {
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
          throw new Error('Не удалось удалить куки!');
        }
        dispatch({
          type: USER_LOGOUT_SUCCESS,
        });
        callback();
      })
      .catch(() => {
        dispatch({
          type: USER_REQUEST_FAILED,
        });
      });
  };
}

export function getResetCode(data, callback) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    api
      .getResetCode(data)
      .then(() => {
        dispatch({ type: GET_RESET_CODE_SUCCESS });
        callback();
      })
      .catch(() => {
        dispatch({
          type: USER_REQUEST_FAILED,
        });
      });
  };
}

export function resetPassword(data, callback) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    api
      .resetPassword(data)
      .then(() => {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
        callback();
      })
      .catch(() => {
        dispatch({
          type: USER_REQUEST_FAILED,
        });
      });
  };
}
