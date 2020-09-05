/**
 * @author るりと
 */

import React from 'react';
import { useHistory } from 'react-router-dom';

/**
 * stateからログインしているかどうかを抽出している
 * @param {*} state - reduxのstate
 * @returns {boolean} - ログインしているかどうか
 */
export const AuthSelector = (state) => {
  return state.auth.isLoggedIn;
};

/**
 * ログイン状態を管理する
 * ログインが必要となるページにアクセスする際にはここでログインしているかどうかを判断する
 * ログインしている場合は表示したいページを表示する
 * ログインしていない場合はトップページに遷移させる
 * @param {*} props - 表示したいcomponent
 */
const Auth = (props) => {
  const isLoggedIn = useSelector(AuthSelector);
  const history = useHistory();

  if( isLoggedIn ) {
    return (
      <div>{props.children}</div>
    )
  } else {
    // TODO: useHistoryを用いて、ブラウザバックなどに対応できるか調査
    history.push("/toppage");

    // TODO: toppageに飛ばした後、ログインしてと通知を表示させる
  }

}