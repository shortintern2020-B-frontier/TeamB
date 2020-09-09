import axios from '../settings/axios';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const getUsersRequest = () => ({
  type: GET_USERS_REQUEST,
});

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const getUsersSuccess = (json) => ({
  type: GET_USERS_SUCCESS,
  users: json,
  receivedAt: Date.now(),
});

export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const getUsersFailure = (error) => ({
  type: GET_USERS_FAILURE,
  error,
});

export const ENTER_USER_REQUEST = 'ENTER_USER_REQUEST';
export const enterUserRequest = () => ({
  type: ENTER_USER_REQUEST,
});

export const ENTER_USER_SUCCESS = 'ENTER_USER_SUCCESS';
export const enterUserSuccess = () => ({
  type: ENTER_USER_SUCCESS,
  receivedAt: Date.now(),
});

export const ENTER_USER_FAILURE = 'ENTER_USER_FAILURE';
export const enterUserFailure = (error) => ({
  type: ENTER_USER_FAILURE,
  error,
})

export const EXIST_USER_REQUEST = 'EXIST_USER_REQUEST';
export const existUserRequest = () => ({
  type: EXIST_USER_REQUEST,
});

export const EXIST_USER_SUCCESS = 'EXIST_USER_SUCCESS';
export const existUserSuccess = () => ({
  type: EXIST_USER_SUCCESS,
  receivedAt: Date.now(),
});

export const EXIST_USER_FAILURE = 'EXIST_USER_FAILURE';
export const existUserFailure = (error) => ({
  type: EXIST_USER_FAILURE,
  error,
})

export const SET_USER = 'SET_USER';
export const setUser = (user) => ({
  type: SET_USER,
  user: user,
  receivedAt: Date.now(),
});

export const enterUser = (token, history, user) => (dispatch) => {
  console.log('user_geting')

  dispatch(enterUserRequest());
  console.log(user)
  const id = JSON.stringify({
    user: {
      id: user.id
    }
  });
  return axios.get('http://localhost:5000/api/v1/users', id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res.data)
      dispatch(enterUserSuccess());
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setUser(user))
    })
    .catch((err) => dispatch(getUsersFailure(err)))
    .then(() => history.push(`/users/${user.id}`))
    .catch((err) => dispatch(getUsersFailure(err)))
};

export const exitUser = (token) => (dispatch) => {
  dispatch(existUserRequest());
  return axios.get('http://localhost:5000/api/v1/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(existUserSuccess());
    })
    .catch((err) => dispatch(existUserFailure(err)));
}

export const getUsers = (token) => (dispatch) => {
  dispatch(getUsersRequest());
  console.log('user_geting')
  return axios.get('http://localhost:5000/api/v1/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log('------------')
      console.log(res.data.data.users)
      dispatch(getUsersSuccess(res.data.data.users))
    })
    .catch((err) => dispatch(getUsersFailure(err)));
};

/**
 * 画面がリロードされた際に、localstrageからルーム情報を取得する
 */
export const userReload = () => (dispatch) => {
  dispatch(enterUserRequest());
  const user = JSON.parse(localStorage.getItem('user'));
  dispatch(setUser(user))
};
