import fetchMock from 'fetch-mock';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockStore } from '../test/redux-test-utlis';
import {
  jest, cleanup, beforeAll, afterEach, describe, test, expect,
} from '../test/test-utils';

import {
  getPostsRequest, getPostsSuccess, getPostsFailure, getPosts,
  GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE,
} from './postAction';

afterEach(() => {
  cleanup;
  fetchMock.restore();
});

describe('postAction', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  test('check post action request', () => {
    const expectedAction = {
      type: GET_POSTS_REQUEST,
    };
    expect(getPostsRequest()).toEqual(expectedAction);
  });

  test('check post action success', () => {
    const data = { title: 'test' };
    const expectedAction = {
      type: GET_POSTS_SUCCESS,
      posts: data,
      receivedAt: Date.now(),
    };
    expect(getPostsSuccess(data)).toEqual(expectedAction);
  });

  test('check post action failed', () => {
    const error = { title: 'test' };
    const expectedAction = {
      type: GET_POSTS_FAILURE,
      error,
    };
    expect(getPostsFailure(error)).toEqual(expectedAction);
  });

  test('check getPosts action', () => {
    const mock = new MockAdapter(axios);
    const data = { isFetching: false, items: 'data' };
    mock.onGet('http://localhost:8000/posts').reply(200, data);

    const expectedAction = [
      { type: GET_POSTS_REQUEST },
      {
        type: GET_POSTS_SUCCESS,
        posts: data,
        receivedAt: Date.now(),
      },
    ];
    const store = mockStore({ posts: [] });

    return store.dispatch(getPosts()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
