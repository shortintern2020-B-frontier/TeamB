import {
  GET_ROOM_USERS_REQUEST, GET_ROOM_USERS_SUCCESS, GET_ROOM_USERS_FAILURE,
} from '../actions/roomAction';

const initalState = {
  isFetching: false,
  roomUsers: [],
};

const roomUsers = (state = initalState, action) => {
  switch (action.type) {
    case GET_ROOM_USERS_REQUEST:
      return {
        isFetching: true,
        roomsUsers: [],
      };
    case GET_ROOM_USERS_SUCCESS:
      return {
        isFetching: false,
        roomUsers: action.roomUsers,
        lastUpdated: action.receivedAt,
      };
    case GET_ROOM_USERS_FAILURE:
      return {
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default roomUsers;
