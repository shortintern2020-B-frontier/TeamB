import React from 'react';
import {
  render, cleanup, afterEach, describe, test, expect,
} from '../../test/test-utils';

import CreateRoomDialog from './createRoomDialog';

// TODO: testを書く
afterEach(cleanup);
describe('createRoomDialog', () => {
  test('check test', () => {
    render(<CreateRoomDialog />);
    const msg = 'msg';
    expect(msg).toEqual(msg);
  });
});
