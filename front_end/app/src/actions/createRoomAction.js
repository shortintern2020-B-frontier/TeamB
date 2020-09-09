import axios from '../settings/axios';
import { enterRoom, setRoom } from './roomAction'

export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST';
export const createRoomRequest = () => ({
  type: CREATE_ROOM_REQUEST,
});

export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const createRoomSuccess = () => ({
  type: CREATE_ROOM_SUCCESS,
  receivedAt: Date.now(),
});

export const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE';
export const createRoomFailure = (error) => ({
  type: CREATE_ROOM_FAILURE,
  error,
});

export const OPEN_ROOM_DIALOG = 'OPEN_ROOM_DIALOG';
export const openRoomDialog = () => ({
  type: OPEN_ROOM_DIALOG,
});

export const CLOSE_ROOM_DIALOG = 'CLOSE_ROOM_DIALOG';
export const closeRoomDialog = () => ({
  type: CLOSE_ROOM_DIALOG,
});

const getHeaders = (token) => ({ Authorization: `Bearer ${token}` });

// TODO: 実際のapiを叩く箇所を実装する
// TODO: idの部分は削除
// TODO: redux-thunkに置き換える
/**
 * ルーム作成を行うAction
 * @param {string} token - jwtのtoken
 * @param {Object} data - ルーム作成を行うのに必要なデータ
 */
export const createRoom = (token, data, history) => (dispatch) => {
  dispatch(createRoomRequest());
  return axios.post('http://localhost:5000/api/v1/rooms', data, {
    headers: getHeaders(token),
  })
    .then((res) => {
      dispatch(createRoomSuccess())
      dispatch(enterRoom(token, history, res.data.data.room))
    })
    .catch((err) => dispatch(createRoomFailure(err)))
};

/**
 * ダイアログをopenするAction
 */
export const openDialog = () => (dispatch) => {
  dispatch(openRoomDialog());
};

/**
 * ダイアログをcloseするAction
 */
export const closeDialog = () => (dispatch) => {
  dispatch(closeRoomDialog());
};
