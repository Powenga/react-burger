import {
  GET_RESET_CODE_SUCCESS,
  GET_USER_REQUEST_FAILED,
  GET_USER_REQUEST_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS,
} from '../../utils/constants';
import { TUserActions } from '../actions/user';
import { user } from './user';

const testUser = { email: 'test@test.test', name: 'TestUser' };

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(user(undefined, {} as TUserActions)).toEqual({
      user: { email: '', name: '' },
      isUserLoaded: false,
      isLoggedIn: false,
      userRequest: false,
      requestFaided: false,
    });
  });

  it('should handle GET_USER_REQUEST_FAILED', () => {
    expect(user(undefined, { type: GET_USER_REQUEST_FAILED })).toEqual({
      user: { email: '', name: '' },
      isUserLoaded: true,
      isLoggedIn: false,
      userRequest: false,
      requestFaided: true,
    });
  });

  it('should handle GET_USER_REQUEST_SUCCESS', () => {
    expect(
      user(undefined, { type: GET_USER_REQUEST_SUCCESS, user: testUser })
    ).toEqual({
      user: testUser,
      isUserLoaded: true,
      isLoggedIn: true,
      userRequest: false,
      requestFaided: false,
    });
  });

  it('should handle USER_REQUEST', () => {
    expect(user(undefined, { type: USER_REQUEST })).toEqual({
      user: { email: '', name: '' },
      isUserLoaded: false,
      isLoggedIn: false,
      userRequest: true,
      requestFaided: false,
    });
  });

  it('should handle USER_REQUEST_FAILED', () => {
    expect(
      user(undefined, { type: USER_REQUEST_FAILED })
    ).toEqual({
      user: { email: '', name: '' },
      isUserLoaded: true,
      isLoggedIn: false,
      userRequest: false,
      requestFaided: true,
    });
  });

  it('should handle USER_REQUEST_SUCCESS', () => {
    expect(
      user(undefined, { type: USER_REQUEST_SUCCESS, user: testUser })
    ).toEqual({
      user: testUser,
      isUserLoaded: true,
      isLoggedIn: true,
      userRequest: false,
      requestFaided: false,
    });
  });

  it('should handle USER_LOGOUT_SUCCESS', () => {
    expect(
      user(
        {
          user: testUser,
          isUserLoaded: true,
          isLoggedIn: true,
          userRequest: false,
          requestFaided: false,
        },
        { type: USER_LOGOUT_SUCCESS }
      )
    ).toEqual({
      user: { email: '', name: '' },
      isUserLoaded: true,
      isLoggedIn: false,
      userRequest: false,
      requestFaided: false,
    });
  });

  it('should handle GET_RESET_CODE_SUCCESS', () => {
    expect(user(undefined, { type: GET_RESET_CODE_SUCCESS })).toEqual({
      user: { email: '', name: '' },
      isUserLoaded: false,
      isLoggedIn: false,
      userRequest: false,
      requestFaided: false,
    });
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(user(undefined, { type: RESET_PASSWORD_SUCCESS })).toEqual({
      user: { email: '', name: '' },
      isUserLoaded: false,
      isLoggedIn: false,
      userRequest: false,
      requestFaided: false,
    });
  });
});
