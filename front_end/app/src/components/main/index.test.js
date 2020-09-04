import React from 'react';
import {
  render, screen, cleanup, afterEach, describe, test, expect,
} from '../../test/test-utils';

import { PostList, mainSelector } from './index';

afterEach(cleanup);
describe('Main', () => {
  test('check mainSelector behavior', () => {
    const state = {
      posts: [{ items: ['test'] },
        { items: ['test2'] }],
    };
    const result = mainSelector(state);
    expect(result.items).toBe(state.posts[state.posts.length - 1].items);
  });

  test('check PostList behavior', () => {
    const posts = { isFetching: false, items: [{ title: 'test2' }, { title: 'test3' }] };
    render(<PostList {...posts} />);
    expect(screen.getByText('test2', { exact: false })).toBeInTheDocument;
    expect(screen.getByText('test3', { exact: false })).toBeInTheDocument;
  });

  test('check PostList behavior with loading data', () => {
    const posts = { isFetching: true, items: [{ title: 'test2' }, { title: 'test3' }] };
    render(<PostList {...posts} />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });
});
