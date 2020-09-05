import axios from '../settings/axios';
import MockAdapter from 'axios-mock-adapter';
import { mockStore } from '../test/redux-test-utlis';
import {
  jest, cleanup, beforeAll, afterEach, describe, test, expect,
} from '../test/test-utils';

import {
  loginRequest, loginSuccess, loginFailure, login,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from './authAction';
import fetchMock from 'fetch-mock';

afterEach(() => {
  cleanup;
  fetchMock.restore();
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
  // loginSuccessに渡すものはtokenではなくユーザーデータ
  test('check login action success', () => {
    const token = "token";
    const expectedAction = {
      type: LOGIN_SUCCESS,
      token: token,
      receivedAt: Date.now(),
    };
    expect(loginSuccess(token)).toEqual(expectedAction);
  });

  test('check login action failed', () => {
    const error = "err";
    const expectedAction = {
      type: LOGIN_FAILURE,
      error,
    };
    expect(loginFailure(error)).toEqual(expectedAction);
  });

  // TODO: loginのtestを書く
})