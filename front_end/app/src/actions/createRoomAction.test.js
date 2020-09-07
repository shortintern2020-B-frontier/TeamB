import fetchMock from 'fetch-mock';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockStore } from '../test/redux-test-utlis';
import {
  jest, cleanup, beforeAll, afterEach, describe, test, expect,
} from '../test/test-utils';

import {
  createRoomRequest, createRoomSuccess, createRoomFailure, createRoom,
  CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE,
} from './createRoomAction';

afterEach(() => {
  cleanup;
  fetchMock.restore();
});

describe('create Action', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  // TODO: testを書く

  test('check create room action request', () => {
    const expectedAction = {
      type: CREATE_ROOM_REQUEST,
    };
    expect(createRoomRequest()).toEqual(expectedAction);
  });

  test('check create room action success', () => {
    const data = 1;

    const expectedAction = {
      type: CREATE_ROOM_SUCCESS,
      room_id: data,
      receivedAt: Date.now(),
    };
    expect(createRoomSuccess(data)).toEqual(expectedAction);
  });

  test('check create room action failed', () => {
    const error = { title: 'test' };
    const expectedAction = {
      type: CREATE_ROOM_FAILURE,
      error,
    };
    expect(createRoomFailure(error)).toEqual(expectedAction);
  });
  // TODO: createRoomのtestを書く
});
