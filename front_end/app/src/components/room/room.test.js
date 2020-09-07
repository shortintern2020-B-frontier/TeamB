import React from 'react';
import {
  render, screen, cleanup, afterEach, describe, test, expect,
} from '../../test/test-utils';

import { Room } from './room';

afterEach(cleanup);
describe('Room', () => {
  test('check Room behavior', () => {
    render(<Room />);
    expect(screen.getByText('room page', { exact: false })).toBeInTheDocument;
  });
});