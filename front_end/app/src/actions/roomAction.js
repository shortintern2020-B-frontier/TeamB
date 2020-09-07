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

export const GET_ROOM_REQUEST = 'GET_ROOM_REQUEST';
export const getRoomRequest = () => ({
  type: GET_ROOM_REQUEST,
});

export const GET_ROOM_SUCCESS = 'GET_ROOM_SUCCESS';
export const getRoomSuccess = (json) => ({
  type: GET_ROOM_SUCCESS,
  room: json,
  receivedAt: Date.now(),
});

export const GET_ROOM_FAILURE = 'GET_ROOM_FAILURE';
export const getRoomFailure = (error) => ({
  type: GET_ROOM_FAILURE,
  error,
});

export const getRooms = (token) => (dispatch) => {
  dispatch(getRoomsRequest());
  return axios.get('http://localhost:8000/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => dispatch(getRoomsSuccess(res.data)))
    .catch((err) => dispatch(getRoomsFailure(err)));
};

export const getRoom = (token, room_id) => (dispatch) => {
  dispatch(getRoomRequest());
  return axios.get(`http://localhost:8000/rooms/${room_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => dispatch(getRoomSuccess(res.data)))
    .catch((err) => dispatch(getRoomFailure(err)));
};