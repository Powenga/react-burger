import {
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_SUCCESS,
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS,
  USER_LOGOUT_SUCCESS,
  GET_RESET_CODE_SUCCESS,
  RESET_PASSWORD_SUCCESS,
} from '../../utils/constants';

import { TUserActions } from '../actions/user';
import { TUser } from '../../utils/types';

type TUserState = {
  user: TUser;
  isUserLoaded: Boolean;
  isLoggedIn: Boolean;
  userRequest: Boolean;
  requestFaided: Boolean;
};

const userState: TUserState = {
  user: { email: '', name: '' },
  isUserLoaded: false,
  isLoggedIn: false,
  userRequest: false,
  requestFaided: false,
};

export const user = (state = userState, action: TUserActions): TUserState => {
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

    case GET_RESET_CODE_SUCCESS:
      return {
        ...state,
        userRequest: false,
        requestFaided: false,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        userRequest: false,
        requestFaided: false,
      };

    default:
      return state;
  }
};
