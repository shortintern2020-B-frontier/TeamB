import React from 'react';
import {
  screen, describe, test, expect, render,
} from '../../test/test-utils';

import { Toppage } from './toppage';

describe('Toppage', () => {
  test('check Toppage behavior', () => {
    render(<Toppage />);
    expect(screen.getByText('top page', { exact: false })).toBeInTheDocument;
  });
});