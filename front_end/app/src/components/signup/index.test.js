import React from 'react';
import {
  screen, describe, test, expect, render,
} from '../../test/test-utils';

import Signup from './index';

describe('Signup', () => {
  test('check Signup behavior', () => {
    render(<Signup />);
    expect(screen.getByText('sign up page', { exact: false })).toBeInTheDocument;
  });
});
