import axios from '../settings/axios';

export const RELOAD_REQUEST = 'RELOAD_REQUEST';
export const reloadRequest = () => ({
  type: RELOAD_REQUEST,
});

export const RELOAD_SUCCESS = 'RELOAD_SUCCESS';
export const reloadSuccess = (token, id) => ({
  type: RELOAD_SUCCESS,
  token,
  id,
  receivedAt: Date.now(),
});

export const RELOAD_FAILURE = 'RELOAD_FAILURE';
export const reloadFailure = (error) => ({
  type: RELOAD_FAILURE,
  error,
});

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (token, id) => ({
  type: LOGIN_SUCCESS,
  token,
  id,
  receivedAt: Date.now(),
});

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = (token, id) => ({
  type: SIGNUP_SUCCESS,
  token,
  id,
  receivedAt: Date.now(),
});

export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  error,
});
// Hiranuma
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const logout = () => ({
  type: LOGOUT_REQUEST,
});

// TODO: 実際のapiを叩く箇所を実装する
// TODO: redux-thunkに置き換える
/**
 * ログインアクションをdispatchする
 * @param {Object} user - ログインに必要なデータが格納されている
 * @param {string} user.name - ユーザー名
 * @param {string} user.password - パスワード
 * @param {function} history - ログイン後に遷移を管理する関数
 */
export const login = (user, history) => (dispatch) => {
  dispatch(loginRequest());
  // return axios.post('http://localhost:8000/auth/login', user)
  return axios.post('http://localhost:5000/api/v1/login', user)
    .then((res) => {
      localStorage.setItem('jwt', res.data.token);
      localStorage.setItem('id', res.data.data.id);
      dispatch(loginSuccess(res.data.token, res.data.data.id));
      history.push('/');
    })
    .catch((err) => dispatch(loginFailure(err)));
};

// TODO: 実際のapiを叩く箇所を実装する
// TODO: redux-thunkに置き換える
/**
 * 登録アクションをdispatchする
 * @param {Object} user - ログインに必要なデータが格納されている
 * @param {string} user.name - ユーザー名
 * @param {string} user.password - パスワード
 * @param {function} history - ログイン後に遷移を管理する関数
 */
export const signup = (user, history) => (dispatch) => {
  dispatch(signupRequest());
  return axios.post('http://localhost:5000/api/v1/users', user)
    .then((res) => {
      localStorage.setItem('jwt', res.data.token);
      localStorage.setItem('id', res.data.data.user.id);
      console.log(res.data);
      dispatch(signupSuccess(res.data.token, res.data.data.user.id));
      history.push('/tags?new=true')
    })
    .catch((err) => dispatch(signupFailure(err)))
};

/**
 * 画面がリロードされた際に、localstrageからログイン情報を取得する
 * jwtの取得の可否に応じてstateを更新する
 */
export const reload = () => (dispatch) => {
  dispatch(reloadRequest());
  const jwt = localStorage.getItem('jwt');
  const id = localStorage.getItem('id');
  if (jwt !== null && id !== null) dispatch(reloadSuccess(jwt, id));
  else dispatch(reloadFailure('cannot load jwt token'));
};
