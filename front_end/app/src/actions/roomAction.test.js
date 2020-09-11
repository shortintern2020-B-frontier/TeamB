import fetchMock from 'fetch-mock';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockStore } from '../test/redux-test-utlis';
import {
  jest, cleanup, beforeAll, afterEach, describe, test, expect,
} from '../test/test-utils';

import {
  getRoomsRequest, getRoomsSuccess, getRoomsFailure, getRooms,
  GET_ROOMS_REQUEST, GET_ROOMS_SUCCESS, GET_ROOMS_FAILURE,
  getRoomRequest, getRoomSuccess, getRoomFailure,
  GET_ROOM_REQUEST, GET_ROOM_SUCCESS, GET_ROOM_FAILURE,
} from './roomAction';

afterEach(() => {
  cleanup;
  fetchMock.restore();
});

describe('roomAction', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  test('check rooms action request', () => {
    const expectedAction = {
      type: GET_ROOMS_REQUEST,
    };
    expect(getRoomsRequest()).toEqual(expectedAction);
  });

  test('check rooms action success', () => {
    const data = [{
      id: 1, title: 'youtube a', youtube_id: 1, is_private: true, start_time: '2015-11-1200:00:00+0100',
    }];
    const expectedAction = {
      type: GET_ROOMS_SUCCESS,
      rooms: data,
      receivedAt: Date.now(),
    };
    expect(getRoomsSuccess(data)).toEqual(expectedAction);
  });

  test('check rooms action failed', () => {
    const error = { title: 'test' };
    const expectedAction = {
      type: GET_ROOMS_FAILURE,
      error,
    };
    expect(getRoomsFailure(error)).toEqual(expectedAction);
  });

  // TODO: getRoomsのtestを書く
  /*
  test('check getRooms action', () => {
    const mock = new MockAdapter(axios);
    const rooms = [{
      id: 1, title: 'youtube a', youtube_id: 1, is_private: true, start_time: '2015-11-1200:00:00+0100',
    }];
    const data = { isFetching: false, rooms };
    mock.onGet('http://localhost:8000/rooms').reply(200, data);

    const expectedAction = [
      { type: GET_ROOMS_REQUEST },
      {
        type: GET_ROOMS_SUCCESS,
        rooms: data,
        receivedAt: Date.now(),
      },
    ];
    const store = mockStore({ rooms: [] });

    return store.dispatch(getRooms()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  */

  test('check room action request', () => {
    const expectedAction = {
      type: GET_ROOM_REQUEST,
    };
    expect(getRoomRequest()).toEqual(expectedAction);
  });

  test('check room action success', () => {
    const data = [{
      id: 1, title: 'youtube a', youtube_id: 1, is_private: true, start_time: '2015-11-1200:00:00+0100',
    }];
    const expectedAction = {
      type: GET_ROOM_SUCCESS,
      room: data,
      receivedAt: Date.now(),
    };
    expect(getRoomSuccess(data)).toEqual(expectedAction);
  });

  test('check room action failed', () => {
    const error = { title: 'test' };
    const expectedAction = {
      type: GET_ROOM_FAILURE,
      error,
    };
    expect(getRoomFailure(error)).toEqual(expectedAction);
  });

  // TODO: getRoomのtestを書く
  /*
  test('check getRoom action', () => {
    const mock = new MockAdapter(axios);
    const room = {
      id: 1,
      title: 'youtube a',
      youtube_id: 1,
      is_private: true,
      start_time: '2015-11-1200:00:00+0100',
    };
    const data = { isFetching: false, room: room };
    mock.onGet(`http://localhost:8000/rooms/${room.id}`).reply(200, data);

    const expectedAction = [
      { type: GET_ROOM_REQUEST },
      {
        type: GET_ROOM_SUCCESS,
        room: data,
        receivedAt: Date.now(),
      },
    ];
    const store = mockStore({ room: [] });

    return store.dispatch(getRoom()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  */
});
