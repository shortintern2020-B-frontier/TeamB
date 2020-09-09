import room from './roomReducer';

import {
  SET_ROOM
} from '../actions/roomAction';

import {
  jest, describe, test, expect, beforeAll,
} from '../test/test-utils';

describe('room reducer', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  test('should return the initial state', () => {
    expect(room(undefined, {})).toEqual({
      isFetching: false,
      room: {},
    });
  });

  test('should handle GET_ROOM_REQUEST', () => {
    expect(
      room([], {
        type: GET_ROOM_REQUEST,
      }),
    ).toEqual({
      isFetching: true,
      room: {},
    });
  });

  test('should handle GET_ROOM_SUCCESS', () => {
    const data = {
      id: 1, title: 'youtube a', youtube_id: 1, is_private: true, start_time: '2015-11-1200:00:00+0100',
    };
    const expectedObject = {
      isFetching: false,
      room: data,
      lastUpdated: Date.now(),
    };

    expect(
      room([], {
        type: GET_ROOM_SUCCESS,
        room: data,
        receivedAt: Date.now(),
      }),
    ).toEqual(expectedObject);
  });

  test('should handle GET_ROOM_FAILURE', () => {
    const error = 'error';

    expect(
      room([], {
        type: GET_ROOM_FAILURE,
        error,
      }),
    ).toEqual({
      isFetching: false,
      error,
    });
  });
});
