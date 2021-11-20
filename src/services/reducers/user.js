import {
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_SUCCESS,
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from '../actions/user';

const userState = {
  user: { email: '', name: '' },
  isUserLoaded: false,
  isLoggedIn: false,
  userRequest: false,
  requestFaided: false,
};

export const user = (state = userState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST_FAILED:
      return {
        ...state,

        requestFaided: true,
        user: { email: '', name: '' },
        isUserLoaded: true,
        isLoggedIn: false,
      };

    case GET_USER_REQUEST_SUCCESS:
      return {
        ...state,

        requestFaided: false,
        user: { ...action.user },
        isUserLoaded: true,
        isLoggedIn: true,
      };

    case USER_REQUEST:
      return {
        ...state,
        userRequest: true,
      };

    case USER_REQUEST_FAILED:
      return {
        ...state,
        userRequest: false,
        requestFaided: true,
        user: { email: '', name: '' },
        isUserLoaded: true,
        isLoggedIn: false,
      };

    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        userRequest: false,
        requestFaided: false,
        user: { ...action.user },
        isUserLoaded: true,
        isLoggedIn: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userRequest: false,
        requestFaided: false,
        user: { email: '', name: '' },
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
