import rooms from './roomsReducer';

import {
  GET_ROOMS_REQUEST, GET_ROOMS_SUCCESS, GET_ROOMS_FAILURE,
} from '../actions/roomAction';

import {
  jest, describe, test, expect, beforeAll,
} from '../test/test-utils';

describe('rooms reducer', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  test('should return the initial state', () => {
    expect(rooms(undefined, {})).toEqual({
      isFetching: false,
      rooms: [],
    });
  });

  test('should handle GET_ROOMS_REQUEST', () => {
    expect(
      rooms([], {
        type: GET_ROOMS_REQUEST,
      }),
    ).toEqual({
      isFetching: true,
      rooms: [],
    });
  });

  test('should handle GET_ROOMS_SUCCESS', () => {
    const data = {
      id: 1, title: 'youtube a', youtube_id: 1, is_private: true, start_time: '2015-11-1200:00:00+0100',
    };
    const expectedObject = {
      isFetching: false,
      rooms: [data],
      lastUpdated: Date.now(),
    };

    expect(
      rooms([], {
        type: GET_ROOMS_SUCCESS,
        rooms: [data],
        receivedAt: Date.now(),
      }),
    ).toEqual(expectedObject);
  });

  test('should handle GET_ROOMS_FAILURE', () => {
    const error = 'error';

    expect(
      rooms([], {
        type: GET_ROOMS_FAILURE,
        error,
      }),
    ).toEqual({
      isFetching: false,
      error,
    });
  });
});
