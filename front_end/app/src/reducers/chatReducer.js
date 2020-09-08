import {
  INIT_CHAT_REQUEST, INIT_CHAT_SUCCESS, INIT_CHAT_FAILURE,
  POST_CHAT_REQUEST, POST_CHAT_SUCCESS, POST_CHAT_FAILURE,
  CLOSE_CHAT,
} from '../actions/chatAction';

const initialState = {
  ws: null,
  msgs: [],
  isLoading: false,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CHAT_REQUEST:
      return {
        ws: null,
        msgs: [],
        isLoading: true,
      };
    case INIT_CHAT_SUCCESS:
      return {
        ws: action.ws,
        msgs: [],
        id: action.id,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case INIT_CHAT_FAILURE:
      return {
        ws: null,
        msgs: [],
        isLoading: false,
        error: action.error,
      };
    case POST_CHAT_REQUEST:
      return {
        ws: state.ws,
        msgs: state.msgs,
        isLoading: true,
      };
    case POST_CHAT_SUCCESS:
      return {
        ws: state.ws,
        msgs: action.msg,
        isLoading: false,
        lastUpdated: action.receivedAt,
      };
    case POST_CHAT_FAILURE:
      return {
        ws: state.ws,
        msgs: state.msgs,
        isLoading: false,
        error: action.error,
      };
    case CLOSE_CHAT:
      return {
        ws: null,
        msgs: [],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default chat;
