import {
  INIT_CHAT, POST_CHAT, CLOSE_CHAT, RECEIVE_CHAT,
} from '../actions/chatAction';

const initialState = {
  ws: null,
  msgs: [],
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CHAT:
      return {
        ws: action.ws,
        msgs: [],
        lastUpdated: action.receivedAt,
      };
    case POST_CHAT:
      return {
        ws: state.ws,
        msgs: [...state.msgs, action.msg],
        lastUpdated: action.receivedAt,
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
