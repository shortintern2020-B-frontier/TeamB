import fetchMock from 'fetch-mock';
import {
  jest, cleanup, beforeAll, afterEach, describe, test, expect,
} from '../test/test-utils';

import {
  signupRequest, signupSuccess, signupFailure,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  loginRequest, loginSuccess, loginFailure,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from './authAction';

afterEach(() => {
  cleanup;
  fetchMock.restore();
});

describe('signupAction', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  test('check signup action request', () => {
    const expectedAction = {
      type: SIGNUP_REQUEST,
    };
    expect(signupRequest()).toEqual(expectedAction);
  });

  // TODO: 実際のapiを叩くように変更した場合ここも修正する
  test('check signup action success', () => {
    const token = 'token';
    const expectedAction = {
      type: SIGNUP_SUCCESS,
      token,
      receivedAt: Date.now(),
    };
    expect(signupSuccess(token)).toEqual(expectedAction);
  });

  test('check signup action failed', () => {
    const error = 'err';
    const expectedAction = {
      type: SIGNUP_FAILURE,
      error,
    };
    expect(signupFailure(error)).toEqual(expectedAction);
  });

  // TODO: signupのtestを書く
});

describe('loginAction', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  test('check login action request', () => {
    const expectedAction = {
      type: LOGIN_REQUEST,
    };
    expect(loginRequest()).toEqual(expectedAction);
  });

  // TODO: 実際のapiを叩くように変更した場合ここも修正する
  test('check login action success', () => {
    const token = 'token';
    const expectedAction = {
      type: LOGIN_SUCCESS,
      token,
      receivedAt: Date.now(),
    };
    expect(loginSuccess(token)).toEqual(expectedAction);
  });

  test('check login action failed', () => {
    const error = 'err';
    const expectedAction = {
      type: LOGIN_FAILURE,
      error,
    };
    expect(loginFailure(error)).toEqual(expectedAction);
  });

  // TODO: loginのtestを書く
});
