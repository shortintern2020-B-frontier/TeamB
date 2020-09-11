import {
  GET_ROOMS_REQUEST, GET_ROOMS_SUCCESS, GET_ROOMS_FAILURE,
} from '../actions/roomAction';

const initalState = {
  isFetching: false,
  rooms: [],
};

const rooms = (state = initalState, action) => {
  switch (action.type) {
    case GET_ROOMS_REQUEST:
      return {
        isFetching: true,
        rooms: [],
      };
    case GET_ROOMS_SUCCESS:
      return {
        isFetching: false,
        rooms: action.rooms.rooms,
        lastUpdated: action.receivedAt,
      };
    case GET_ROOMS_FAILURE:
      return {
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default rooms;
