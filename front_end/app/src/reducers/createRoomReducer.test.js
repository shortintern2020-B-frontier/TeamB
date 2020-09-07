import createRoom from './createRoomReducer';

import {
  CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE,
} from '../actions/createRoomAction';

import {
  jest, describe, test, expect, beforeAll,
} from '../test/test-utils';

describe('create room reducer', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  test('should return the initial state', () => {
    expect(createRoom(undefined, {})).toEqual({
      isLoading: false,
      name: '',
      youtube_id: '',
      is_private: false,
      start_time: '2019/8/1 12:00:00',
    });
  });

  test('should handle CREATE_ROOM_REQUEST', () => {
    expect(
      createRoom([], {
        type: CREATE_ROOM_REQUEST,
      }),
    ).toEqual({
      isLoading: true,
      name: '',
      youtube_id: '',
      is_private: false,
      start_time: '2019/8/1 12:00:00',
    });
  });

  test('should handle CREATE_ROOM_SUCCESS', () => {
    const data = {
      name: 'room1',
      youtube_id: 1,
      is_private: true,
      start_time: Date.now(),
    };
    const expectedObject = {
      isLoading: false,
      name: data.name,
      youtube_id: data.youtube_id,
      is_private: data.is_private,
      start_time: data.start_time,
      lastUpdated: Date.now(),
    };

    expect(
      createRoom([], {
        type: CREATE_ROOM_SUCCESS,
        name: data.name,
        youtube_id: data.youtube_id,
        is_private: data.is_private,
        start_time: data.start_time,
        receivedAt: Date.now(),
      }),
    ).toEqual(expectedObject);
  });

  test('should handle CREATE_ROOM_FAILURE', () => {
    const error = 'error';

    expect(
      createRoom([], {
        type: CREATE_ROOM_FAILURE,
        error,
      }),
    ).toEqual({
      isLoading: false,
      name: '',
      youtube_id: '',
      is_private: false,
      start_time: '2019/8/1 12:00:00',
      error,
    });
  });
});
