import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
} from '../actions/user';

const userState = {
  user: { email: '', name: '', isLogginIn: false },

  request: false,
  requestFaided: false,
};

export const user = (state = userState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        request: true,
      };

    case LOGIN_REQUEST_FAILED:
      return {
        ...state,
        request: false,
        requestFaided: true,
        user: { email: '', name: '', isLogginIn: false },
      };

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        requestFaided: false,
        user: { ...action.user, isLogginIn: true },
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        request: true,
      };

    case REGISTER_REQUEST_FAILED:
      return {
        ...state,
        request: false,
        requestFaided: true,
        user: { email: '', name: '', isLogginIn: false },
      };

    case REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        requestFaided: false,
        user: { ...action.user, isLogginIn: true },
      };

    default:
      return state;
  }
};
