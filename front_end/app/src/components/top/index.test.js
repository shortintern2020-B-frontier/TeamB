import React from 'react';
import {
  screen, describe, test, expect, render,
} from '../../test/test-utils';

import Toppage from './index';

describe('Toppage', () => {
  test('check Toppage behavior', () => {
    render(<Toppage />);
    expect(screen.getByText('top page', { exact: false })).toBeInTheDocument;
  });
  // TODO: ログインページや登録ページに遷移するボタンのtestを書く
});
