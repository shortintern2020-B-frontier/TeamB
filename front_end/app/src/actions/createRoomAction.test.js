import fetchMock from 'fetch-mock';

import {
  jest, cleanup, beforeAll, afterEach, describe, test, expect,
} from '../test/test-utils';

import {
  createRoomRequest, createRoomSuccess, createRoomFailure, openRoomDialog, closeRoomDialog,
  CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE,
  OPEN_ROOM_DIALOG, CLOSE_ROOM_DIALOG,
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

    const expectedAction = {
      type: CREATE_ROOM_SUCCESS,
      receivedAt: Date.now(),
    };
    expect(createRoomSuccess()).toEqual(expectedAction);
  });

  test('check create room action failed', () => {
    const error = { title: 'test' };
    const expectedAction = {
      type: CREATE_ROOM_FAILURE,
      error,
    };
    expect(createRoomFailure(error)).toEqual(expectedAction);
  });

  test('check open room dialog', () => {
    const expectedAction = {
      type: OPEN_ROOM_DIALOG,
    };
    expect(openRoomDialog()).toEqual(expectedAction);
  });

  test('check close room dialog', () => {
    const expectedAction = {
      type: CLOSE_ROOM_DIALOG,
    };
    expect(closeRoomDialog()).toEqual(expectedAction);
  });
  // TODO: createRoomのtestを書く
});
