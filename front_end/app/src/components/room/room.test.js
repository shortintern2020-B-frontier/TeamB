import {
  cleanup, afterEach, describe, test, expect,
} from '../../test/test-utils';

// TODO: testを書く
afterEach(cleanup);
describe('Room', () => {
  test('check Room behavior', () => {
    const msg = 'msg';
    expect(msg).toEqual(msg);
  });
});
