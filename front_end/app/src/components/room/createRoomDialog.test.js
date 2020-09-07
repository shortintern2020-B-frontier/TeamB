import React from 'react';
import {
  render, screen, cleanup, afterEach, describe, test, expect,
} from '../../test/test-utils';

import { CreateRoomDialog } from './createRoomDialog';

afterEach(cleanup);
describe('createRoomDialog', () => {
  test('check test', () => {
    render(<CreateRoomDialog />);
    const msg = "msg"
    expect(msg).toEqual(msg);
  })
})