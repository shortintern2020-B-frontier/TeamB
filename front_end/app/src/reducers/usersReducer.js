import {
  GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE,
} from '../actions/userAction';

const initalState = {
  isFetching: false,
  users: [],
};

const users = (state = initalState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        isFetching: true,
        users: [],
      };
    case GET_USERS_SUCCESS:
      return {
        isFetching: false,
        users: action.users,
        lastUpdated: action.receivedAt,
      };
    case GET_USERS_FAILURE:
      return {
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default users;
