import auth from '../../utils/auth';

export const LOGIN_REQUEST = 'LOGIN';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

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