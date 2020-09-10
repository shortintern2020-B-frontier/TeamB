import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
} from '../actions/userAction';

const initalState = {
  isFetching: false,
  user: [],
};

const user = (state = initalState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        isFetching: true,
        user: [],
      };
    case GET_USER_SUCCESS:
      return {
        isFetching: false,
        user: action.user,
        lastUpdated: action.receivedAt,
      };
    case GET_USER_FAILURE:
      return {
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default user;
