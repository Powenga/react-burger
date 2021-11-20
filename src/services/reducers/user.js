import {
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from '../actions/user';

const userState = {
  user: { email: '', name: '' },
  isUserLoaded: false,
  isLoggedIn: false,
  request: true,
  requestFaided: false,
};

export const user = (state = userState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        request: true,
      };

    case USER_REQUEST_FAILED:
      return {
        ...state,
        request: false,
        requestFaided: true,
        user: { email: '', name: '' },
        isUserLoaded: true,
        isLoggedIn: false,
      };

    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        requestFaided: false,
        user: { ...action.user },
        isUserLoaded: true,
        isLoggedIn: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        request: false,
        requestFaided: false,
        user: { email: '', name: '' },
        isUserLoaded: false,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
