import {
  INIT_CHAT, CLOSE_CHAT, RECEIVE_CHAT,
  POST_CHAT_REQUEST, POST_CHAT_SUCCESS, POST_CHAT_FAILURE,
} from '../actions/chatAction';

const initialState = {
  ws: null,
  msgs: [],
  isLoading: false,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CHAT:
      return {
        ws: action.ws,
        msgs: [],
        lastUpdated: action.receivedAt,
        isLoading: false,
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
        msgs: state.msgs,
        lastUpdated: action.receivedAt,
        isLoading: true,
      };
    case POST_CHAT_FAILURE:
      return {
        ws: state.ws,
        msgs: state.msgs,
        isLoading: false,
        error: action.error,
      };
    case RECEIVE_CHAT:
      return {
        ws: state.ws,
        msgs: [...state.msgs, action.msg],
        lastUpdated: action.receivedAt,
      };
    case CLOSE_CHAT:
      return {
        ws: null,
        msgs: [],
      };
    default:
      return state;
  }
};

export default chat;
