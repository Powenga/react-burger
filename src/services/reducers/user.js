import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
} from '../actions/user';

const userState = {
  user: { email: '', name: '', isLogginIn: false },
  loginRequest: false,
  loginRequestFaided: false,
};

export const user = (state = userState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginRequest: true,
      };

    case LOGIN_REQUEST_FAILED:
      return {
        ...state,
        loginRequest: false,
        loginRequestFaided: true,
      };

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loginRequest: false,
        loginRequestFaided: false,
        user: action.user,
      };

    default:
      return state;
  }
};
