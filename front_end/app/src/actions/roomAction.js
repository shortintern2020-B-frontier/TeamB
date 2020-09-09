import axios from '../settings/axios';

export const GET_ROOMS_REQUEST = 'GET_ROOMS_REQUEST';
export const getRoomsRequest = () => ({
  type: GET_ROOMS_REQUEST,
});

export const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS';
export const getRoomsSuccess = (json) => ({
  type: GET_ROOMS_SUCCESS,
  rooms: json,
  receivedAt: Date.now(),
});

export const GET_ROOMS_FAILURE = 'GET_ROOMS_FAILURE';
export const getRoomsFailure = (error) => ({
  type: GET_ROOMS_FAILURE,
  error,
});

export const ENTER_ROOM_REQUEST = 'ENTER_ROOM_REQUEST';
export const enterRoomRequest = () => ({
  type: ENTER_ROOM_REQUEST,
});

export const ENTER_ROOM_SUCCESS = 'ENTER_ROOM_SUCCESS';
export const enterRoomSuccess = () => ({
  type: ENTER_ROOM_SUCCESS,
  receivedAt: Date.now(),
});

export const ENTER_ROOM_FAILURE = 'ENTER_ROOM_FAILURE';
export const enterRoomFailure = (error) => ({
  type: ENTER_ROOM_FAILURE,
  error,
})

export const EXIST_ROOM_REQUEST = 'EXIST_ROOM_REQUEST';
export const existRoomRequest = () => ({
  type: EXIST_ROOM_REQUEST,
});

export const EXIST_ROOM_SUCCESS = 'EXIST_ROOM_SUCCESS';
export const existRoomSuccess = () => ({
  type: EXIST_ROOM_SUCCESS,
  receivedAt: Date.now(),
});

export const EXIST_ROOM_FAILURE = 'EXIST_ROOM_FAILURE';
export const existRoomFailure = (error) => ({
  type: EXIST_ROOM_FAILURE,
  error,
})
export const GET_ROOM_USERS_REQUEST = 'GET_ROOM_USERS_REQUEST';
export const getRoomUsersRequest = () => ({
  type: GET_ROOM_USERS_REQUEST,
});

export const GET_ROOM_USERS_SUCCESS = 'GET_ROOM_USERS_SUCCESS';
export const getRoomUsersSuccess = (json) => ({
  type: GET_ROOM_USERS_SUCCESS,
  roomUsers: json,
  receivedAt: Date.now(),
});

export const GET_ROOM_USERS_FAILURE = 'GET_ROOM_USERS_FAILURE';
export const getRoomUsersFailure = (error) => ({
  type: GET_ROOM_USERS_FAILURE,
  error,
})


export const SET_ROOM = 'SET_ROOM';
export const setRoom = (room) => ({
  type: SET_ROOM,
  room: room,
  receivedAt: Date.now(),
});
export const getRoomUsers = (token) => (dispatch) => {
  dispatch(getRoomUsersRequest());
  return axios.get(`http://localhost:5000/api/v1/room_users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(getRoomUsersSuccess(res.data.data.users))
    })
    .catch((err) => dispatch(getRoomUsersFailure(err)));
};
export const enterRoom = (token, history, room) => (dispatch) => {
  dispatch(enterRoomRequest());
  const id = JSON.stringify({
    user: {
      room_id: room.id
    }
  });
  return axios.post('http://localhost:5000/api/v1/room_users', id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(enterRoomSuccess());
      localStorage.setItem('room', JSON.stringify(room));
      dispatch(setRoom(room))
    })
    .catch((err) => dispatch(getRoomsFailure(err)))
    .then(() => history.push(`/rooms/${room.id}`))
    .catch((err) => dispatch(getRoomsFailure(err)))
};

export const exitRoom = (token) => (dispatch) => {
  dispatch(existRoomRequest());
  return axios.get('http://localhost:5000/api/v1/room_users/leave', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(existRoomSuccess());
    })
    .catch((err) => dispatch(existRoomFailure(err)));
}

export const getRooms = (token) => (dispatch) => {
  dispatch(getRoomsRequest());
  return axios.get('http://localhost:5000/api/v1/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(getRoomsSuccess(res.data.data))
    })
    .catch((err) => dispatch(getRoomsFailure(err)));
};

/**
 * 画面がリロードされた際に、localstrageからルーム情報を取得する
 */
export const roomReload = () => (dispatch) => {
  dispatch(enterRoomRequest());
  const room = JSON.parse(localStorage.getItem('room'));
  dispatch(setRoom(room))
};
