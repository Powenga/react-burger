import {
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS,
} from '../actions/user';

const userState = {
  user: { email: '', name: '', isLogginIn: false },

  request: false,
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
        user: { email: '', name: '', isLogginIn: false },
      };

    case USER_REQUEST_SUCCESS:
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
