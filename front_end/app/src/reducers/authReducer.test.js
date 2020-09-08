import auth from './authReducer';

import {
  RELOAD_REQUEST, RELOAD_SUCCESS, RELOAD_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from '../actions/authAction';

import {
  jest, describe, test, expect, beforeAll,
} from '../test/test-utils';

describe('auth reducer', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  test('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(
      {
        token: null,
        isLoggedIn: false,
        isLoading: true,
      },
    );
  });

  test('should handle SIGNUP_REQUEST', () => {
    expect(
      auth([], {
        type: SIGNUP_REQUEST,
      }),
    ).toEqual(
      {
        token: null,
        isLoggedIn: false,
        isLoading: true,
      },
    );
  });

  test('should handle SIGNUP_SUCCESS', () => {
    const token = 'token';
    const expectedObject = {
      token,
      isLoggedIn: true,
      isLoading: false,
      lastUpdated: Date.now(),
    };

    expect(
      auth([], {
        type: SIGNUP_SUCCESS,
        token,
        receivedAt: Date.now(),
      }),
    ).toEqual(expectedObject);
  });

  test('should handle SIGNUP_FAILURE', () => {
    const error = 'error';

    expect(
      auth([], {
        type: SIGNUP_FAILURE,
        error,
      }),
    ).toEqual({
      token: null,
      isLoggedIn: false,
      isLoading: false,
      signup_error: error,
    });
  });

  test('should handle LOGIN_REQUEST', () => {
    expect(
      auth([], {
        type: LOGIN_REQUEST,
      }),
    ).toEqual(
      {
        token: null,
        isLoggedIn: false,
        isLoading: true,
      },
    );
  });

  test('should handle LOGIN_SUCCESS', () => {
    const token = 'token';
    const expectedObject = {
      token,
      isLoggedIn: true,
      isLoading: false,
      lastUpdated: Date.now(),
    };

    expect(
      auth([], {
        type: LOGIN_SUCCESS,
        token,
        receivedAt: Date.now(),
      }),
    ).toEqual(expectedObject);
  });

  test('should handle LOGIN_FAILURE', () => {
    const error = 'error';

    expect(
      auth([], {
        type: LOGIN_FAILURE,
        error,
      }),
    ).toEqual({
      token: null,
      isLoggedIn: false,
      isLoading: false,
      login_error: error,
    });
  });

  test('should handle RELOAD_REQUEST', () => {
    expect(
      auth([], {
        type: RELOAD_REQUEST,
      }),
    ).toEqual(
      {
        token: null,
        isLoggedIn: false,
        isLoading: true,
      },
    );
  });

  test('should handle RELOAD_SUCCESS', () => {
    const token = 'token';
    const expectedObject = {
      token,
      isLoggedIn: true,
      isLoading: false,
      lastUpdated: Date.now(),
    };

    expect(
      auth([], {
        type: RELOAD_SUCCESS,
        token,
        receivedAt: Date.now(),
      }),
    ).toEqual(expectedObject);
  });

  test('should handle RELOAD_FAILURE', () => {
    const error = 'error';

    expect(
      auth([], {
        type: RELOAD_FAILURE,
        error,
      }),
    ).toEqual({
      token: null,
      isLoggedIn: false,
      isLoading: false,
      error,
    });
  });
});
