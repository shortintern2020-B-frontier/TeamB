import {
  GET_ROOM_REQUEST, GET_ROOM_SUCCESS, GET_ROOM_FAILURE,
} from '../actions/roomAction';

const initalState = {
  isFetching: false,
  room: {},
};

const room = (state = initalState, action) => {
  switch (action.type) {
    case GET_ROOM_REQUEST:
      return {
        isFetching: true,
        room: {},
      };
    case GET_ROOM_SUCCESS:
      return {
        isFetching: false,
        room: action.room,
        lastUpdated: action.receivedAt,
      };
    case GET_ROOM_FAILURE:
      return {
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default room;
