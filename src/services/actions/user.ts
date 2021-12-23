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
import auth from '../../utils/auth';
import api from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/utils';
import { TUser, AppDispatch, TToken, AppThunk } from '../../utils/types';

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

function saveCokies(accessToken: TToken, refreshToken: TToken) {
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

export function login(data: { email: string; password: string }) {
  return function (dispatch: AppDispatch) {
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

export const register: AppThunk = (data: {
  email: string;
  name: string;
  password: string;
}) => {
  return function (dispatch: AppDispatch) {
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
};

export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch | AppThunk) {
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
};

export const updateUser: AppThunk = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return function (dispatch: AppDispatch | AppThunk) {
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
};

export function logout(callback: () => void) {
  return function (dispatch: AppDispatch) {
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

export function getResetCode(data: { email: string }, callback: () => void) {
  return function (dispatch: AppDispatch) {
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

export function resetPassword(
  data: { password: string; token: string },
  callback: () => void
) {
  return function (dispatch: AppDispatch) {
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
