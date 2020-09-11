import {
  GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAILURE,
} from '../actions/tagAction';

const initalState = {
  isFetching: false,
  tags: [],
};

const tags = (state = initalState, action) => {
  switch (action.type) {
    case GET_TAGS_REQUEST:
      return {
        isFetching: true,
        tags: [],
      };
    case GET_TAGS_SUCCESS:
      return {
        isFetching: false,
        tags: action.tags,
        lastUpdated: action.receivedAt,
      };
    case GET_TAGS_FAILURE:
      return {
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default tags;
