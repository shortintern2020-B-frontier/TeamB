import posts from './postReducer';

import {
  GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE,
} from '../actions/postAction';

import {
  jest, describe, test, expect, beforeAll,
} from '../test/test-utils';

describe('posts reducer', () => {
  beforeAll(() => {
    // 時間を固定する
    const OriginalDate = Date;
    const now = new OriginalDate('2019/8/1 12:00:00');
    Date.now = jest.fn().mockReturnValue(now.valueOf());
  });

  test('should return the initial state', () => {
    expect(posts(undefined, {})).toEqual([
      {
        isFetching: false,
        items: [],
      },
    ]);
  });

  test('should handle GET_POST_REQUEST', () => {
    expect(
      posts([], {
        type: GET_POSTS_REQUEST,
      }),
    ).toEqual([
      {
        isFetching: true,
        items: [],
      },
    ]);
  });

  test('should handle GET_POST_SUCCESS', () => {
    const data = ['test'];
    const expectedObject = {
      isFetching: false,
      items: data,
      lastUpdated: Date.now(),
    };

    expect(
      posts([], {
        type: GET_POSTS_SUCCESS,
        posts: data,
        receivedAt: Date.now(),
      }),
    ).toEqual([expectedObject]);

    const nextData = ['test2'];
    const nextExpectedObject = {
      isFetching: false,
      items: nextData,
      lastUpdated: Date.now(),
    };

    expect(
      posts([expectedObject], {
        type: GET_POSTS_SUCCESS,
        posts: nextData,
        receivedAt: Date.now(),
      }),
    ).toEqual([
      expectedObject,
      nextExpectedObject,
    ]);
  });

  test('should handle GET_POST_FAILURE', () => {
    const error = 'error';

    expect(
      posts([], {
        type: GET_POSTS_FAILURE,
        error,
      }),
    ).toEqual([
      {
        isFetching: false,
        error,
      },
    ]);
  });
});
