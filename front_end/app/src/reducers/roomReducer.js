import {
  SET_ROOM_FUNC,
} from '../actions/roomAction';

const initalState = {
  isFetching: false,
  room: {},
};

const room = (state = initalState, action) => {
  switch (action.type) {
    case SET_ROOM_FUNC:
      return {
        isFetching: false,
        room: action.room,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

export default room;
