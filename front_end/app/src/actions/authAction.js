import axios from '../settings/axios';

export const RELOAD_REQUEST = 'RELOAD_REQUEST';
export const reloadRequest = () => ({
  type: RELOAD_REQUEST,
});

export const RELOAD_SUCCESS = 'RELOAD_SUCCESS';
export const reloadSuccess = (token) => ({
  type: RELOAD_SUCCESS,
  token,
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
export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token,
  receivedAt: Date.now(),
});

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

// TODO: 実際のapiを叩く箇所を実装する
// TODO: redux-thunkに置き換える
/**
 * ログインアクションをdispatchする
 * @param {Object} user - ログインに必要なデータが格納されている
 * @param {string} user.name - ユーザー名
 * @param {string} user.password - パスワード
 */
export const login = (user) => (dispatch) => {
  dispatch(loginRequest());
  return axios.post('http://localhost:8000/auth/login', user)
    .then((res) => {
      localStorage.setItem('jwt', res.data.access_token);
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => dispatch(loginFailure(err)));
};

/**
 * 画面がリロードされた際に、localstrageからログイン情報を取得する
 * jwtの取得の可否に応じてstateを更新する
 */
export const reload = (jwt) => (dispatch) => {
  dispatch(reloadRequest());

  if (jwt !== null) dispatch(reloadSuccess(jwt));
  else dispatch(reloadFailure('cannot load jwt token'));
};
