import axios from '../settings/axios';

export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST';
export const createRoomRequest = () => ({
  type: CREATE_ROOM_REQUEST,
});

export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const createRoomSuccess = (id) => ({
  type: CREATE_ROOM_SUCCESS,
  room_id: id,
  receivedAt: Date.now(),
});

export const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE';
export const createRoomFailure = (error) => ({
  type: CREATE_ROOM_FAILURE,
  error,
});

// TODO: 実際のapiを叩く箇所を実装する
// TODO: redux-thunkに置き換える
/**
 * ルーム作成を行うAction
 * @param {string} token - jwtのtoken
 * @param {Object} data - ルーム作成を行うのに必要なデータ
 */
export const createRoom = (token, data) => (dispatch) => {
  dispatch(createRoomRequest());
  return axios.post('http://localhost:8000/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  })
    .then((res) => dispatch(createRoomSuccess(res.data)))
    .catch((err) => dispatch(createRoomFailure(err)));
};
