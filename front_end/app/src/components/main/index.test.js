import React from 'react';
import {
  render, screen, cleanup, afterEach, describe, test, expect,
} from '../../test/test-utils';

import { RoomList } from './index';

afterEach(cleanup);
describe('Main', () => {
  test('check RoomList behavior', () => {
    const rooms = { isFetching: false, rooms: [{ name: 'test2' }, { name: 'test3' }] };
    render(<RoomList {...rooms} />);
    expect(screen.getByText('test2', { exact: false })).toBeInTheDocument;
    expect(screen.getByText('test3', { exact: false })).toBeInTheDocument;
  });

  test('check RoomList behavior with loading data', () => {
    const rooms = { isFetching: true, rooms: [{ title: 'test2' }, { title: 'test3' }] };
    render(<RoomList {...rooms} />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });
});
