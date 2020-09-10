import {
  SEARCH_ROOMS_REQUEST, SEARCH_ROOMS_SUCCESS, SEARCH_ROOMS_FAILURE,
} from '../actions/roomAction';

const initalState = {
  isFetching: false,
  rooms: [],
};

const searchedRooms = (state = initalState, action) => {
  switch (action.type) {
    case SEARCH_ROOMS_REQUEST:
      return {
        isFetching: true,
        rooms: [],
      };
    case SEARCH_ROOMS_SUCCESS:
      return {
        isFetching: false,
        rooms: action.rooms.room.reverse(),
        lastUpdated: action.receivedAt,
      };
    case SEARCH_ROOMS_FAILURE:
      return {
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default searchedRooms;
