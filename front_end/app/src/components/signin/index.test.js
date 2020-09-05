import React from 'react';
import {
  screen, describe, test, expect, render,
} from '../../test/test-utils';

import Signin from './index';

describe('Signin', () => {
  test('check Signin page behavior', () => {
    render(<Signin />);
    expect(screen.getByText('sign in', { exact: false })).toBeInTheDocument;
  });
});
