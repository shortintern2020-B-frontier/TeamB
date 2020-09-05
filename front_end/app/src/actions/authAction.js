import axios from '../settings/axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token: token,
  receivedAt: Date.now(),
});

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

// TODO: 実際のapiを叩く箇所を実装する
/**
 * ログインアクションをdispatchする
 * @param {Object} user - ログインに必要なデータが格納されている
 * @param {string} user.name - ユーザー名
 * @param {string} user.password - パスワード
 */
export const login = (user) => (dispatch) => {
  dispatch(loginRequest());
  return axios.post('http://localhost:8000/users', { user })
    .then((res) => dispatch(loginSuccess(res.data)))
    .catch((err) => dispatch(loginFailure(err)));
};