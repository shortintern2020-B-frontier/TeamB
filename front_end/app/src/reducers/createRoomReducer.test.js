import createRoom from './createRoomReducer';

import {
  CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE,
  OPEN_ROOM_DIALOG, CLOSE_ROOM_DIALOG,
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
      is_opened: false,
    });
  });

  test('should handle CREATE_ROOM_REQUEST', () => {
    expect(
      createRoom([], {
        type: CREATE_ROOM_REQUEST,
      }),
    ).toEqual({
      isLoading: true,
      is_opened: true,
    });
  });

  test('should handle CREATE_ROOM_SUCCESS', () => {
    const expectedObject = {
      isLoading: false,
      is_opened: false,
      lastUpdated: Date.now(),
    };

    expect(
      createRoom([], {
        type: CREATE_ROOM_SUCCESS,
        isLoading: false,
        is_opened: false,
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
      is_opened: false,
      error,
    });
  });

  test('should handle OPEN_ROOM_DIALOG', () => {
    expect(
      createRoom([], {
        type: OPEN_ROOM_DIALOG,
      }),
    ).toEqual({
      isLoading: false,
      is_opened: true,
    });
  });

  test('should handle CLOSE_ROOM_DIALOG', () => {
    expect(
      createRoom([], {
        type: CLOSE_ROOM_DIALOG,
      }),
    ).toEqual({
      isLoading: false,
      is_opened: false,
    });
  });
});
