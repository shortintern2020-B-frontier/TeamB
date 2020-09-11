/**
 * @author るりと
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { reload } from '../../actions/authAction';
import { roomReload } from '../../actions/roomAction';
import { getUserTags } from '../../actions/tagAction'

/**
 * stateからログインしているかどうかを抽出している
 * @param {*} state - reduxのstate
 * @returns {boolean} - ログインしているかどうか
 */
export const AuthSelector = (state) => state.auth;

/**
 * ログイン状態を管理する
 * ログインが必要となるページにアクセスする際にはここでログインしているかどうかを判断する
 * ログインしている場合は表示したいページを表示する
 * ログインしていない場合はトップページに遷移させる
 * @param {*} props - 表示したいcomponent
 */

const Auth = (props) => {
  const auth = useSelector(AuthSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(reload())
    if( !location.pathname.indexOf('/room/')) {
      dispatch(roomReload());
    }
    dispatch(getUserTags(auth.token, auth.id));
  }, [location.pathname || auth.isLoading]);

  if (!auth.isLoading && !auth.isLoggedIn) {
    // TODO: useHistoryを用いて、ブラウザバックなどに対応できるか調査
    // TODO: toppageに飛ばした後、ログインしてと通知を表示させる
    history.push('/signin');
  }

  if (auth.isLoading) {
    return (
      <p> loading...... </p>
    );
  }
  return (
    <div>{props.children}</div> // eslint-disable-line react/prop-types
  );
};

export default Auth;
