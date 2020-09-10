import {
  GET_USER_TAGS_REQUEST, GET_USER_TAGS_SUCCESS, GET_USER_TAGS_FAILURE,
} from '../actions/tagAction';

const initalState = {
  isFetching: false,
  tags: [],
};

const userTags = (state = initalState, action) => {
  switch (action.type) {
    case GET_USER_TAGS_REQUEST:
      return {
        isFetching: true,
        tags: [],
      };
    case GET_USER_TAGS_SUCCESS:
      return {
        isFetching: false,
        tags: action.tags,
        lastUpdated: action.receivedAt,
      };
    case GET_USER_TAGS_FAILURE:
      return {
        isFetching: false,
        tags: action.tags !== undefined ? action.tags : [],
        error: action.error,
      };
    default:
      return state;
  }
};

export default userTags;