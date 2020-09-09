import {
  SET_ROOM, ENTER_ROOM_REQUEST, ENTER_ROOM_SUCCESS, ENTER_ROOM_FAILURE,
  EXIST_ROOM_REQUEST, EXIST_ROOM_SUCCESS, EXIST_ROOM_FAILURE,
} from '../actions/roomAction';

const initalState = {
  isFetching: false,
  room: {},
};

const room = (state = initalState, action) => {
  switch (action.type) {
    case SET_ROOM:
      return {
        ifFetching: false,
        room: action.room,
      };
    case ENTER_ROOM_REQUEST:
      return {
        isFetching: true,
        room: state.room,
      };
    case ENTER_ROOM_SUCCESS:
      return {
        isFetching: false,
        room: state.room,
        lastUpdated: action.receivedAt,
      };
    case ENTER_ROOM_FAILURE:
      return {
        isFetching: false,
        room: state.room,
        error: action.error,
      };
    case EXIST_ROOM_REQUEST:
      return {
        isFetching: true,
        room: state.room,
      };
    case EXIST_ROOM_SUCCESS:
      return {
        isFetching: false,
        room: null,
        lastUpdated: action.receivedAt,
      };
    case EXIST_ROOM_FAILURE:
      return {
        isFetching: true,
        room: state.room,
        error: action.error,
      };
    default:
      return state;
  }
};

export default room;
