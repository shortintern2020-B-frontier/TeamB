import auth from './authReducer';

import {
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
    expect(auth(undefined, {})).toEqual([
      {
        token: null,
        isLoggedIn: false,
      },
    ]);
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
      },
    );
  });

  test('should handle LOGIN_SUCCESS', () => {
    const token = "token";
    const expectedObject = {
      token: token,
      isLoggedIn: true,
      lastUpdated: Date.now(),
    };

    expect(
      auth([], {
        type: LOGIN_SUCCESS,
        token: token,
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
    ).toEqual(
      {
        token: null,
        isLoggedIn: false,
        error,
      },
    );
  });
})