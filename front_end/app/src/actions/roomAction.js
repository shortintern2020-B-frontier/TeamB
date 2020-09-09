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

export const SET_ROOM_FUNC = 'SET_ROOM_FUNC';
export const setRoomFunc = (room) => ({
  type: SET_ROOM_FUNC,
  room: room,
  receivedAt: Date.now(),
});

export const setRoom = (room) => (dispatch) => {
  //console.log(room);
  localStorage.setItem('room', room);
  dispatch(setRoomFunc(room));
}

export const getRooms = (token) => (dispatch) => {
  dispatch(getRoomsRequest());
  return axios.get('http://localhost:5000/api/v1/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res.data.data);
      dispatch(getRoomsSuccess(res.data.data))
    })
    .catch((err) => dispatch(getRoomsFailure(err)));
};