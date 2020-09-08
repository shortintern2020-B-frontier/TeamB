import axios from '../settings/axios';

export const INIT_CHAT_REQUEST = 'INIT_CHAT_REQUEST';
export const initChatRequest = () => ({
  type: INIT_CHAT_REQUEST,
});

export const INIT_CHAT_SUCCESS = 'INIT_CHAT_SUCCESS';
export const initChatSuccess = (ws) => ({
  type: RELOAD_SUCCESS,
  ws,
  receivedAt: Date.now(),
});

export const INIT_CHAT_FAILURE = 'INIT_CHAT_FAILURE';
export const initChatFailure = (error) => ({
  type: INIT_CHAT_FAILURE,
  error,
});

export const POST_CHAT_REQUEST = 'POST_CHAT_REQUEST';
export const postChatRequest = () => ({
  type: POST_CHAT_REQUEST,
});

export const POST_CHAT_SUCCESS = 'POST_CHAT_SUCCESS';
export const postChatSuccess = (msg) => ({
  type: POST_CHAT_SUCCESS,
  msg,
  receivedAt: Date.now(),
});

export const POST_CHAT_FAILURE = 'POST_CHAT_FAILURE';
export const postChatFailure = (error) => ({
  type: POST_CHAT_FAILURE,
  error,
});

export const CLOSE_CHAT = 'CLOSE_CHAT';
export const closeChat = () => ({
  type: CLOSE_CHAT,
});

export const connectToWebsocket = (token) => {
  ws = new WebSocket('ws://localhost:5000/cable?token='+token);
  ws.onopen = () => {
    ws.send('Ping');
  };

  ws.onerror = (error) => {
    console.log('WebSocket Error ' + error);
  };

  ws.onmessage = (e) => {
    console.log('Server: ' + e.data);
  };

  return (dispatch(initChatRequest()))
    .then(() => dispatch(initChatSuccess(ws)))
    .catch((err) => dispatch(initChatFailure(err)));
}

export const closeWebsocket = () => {
  dispatch(closeChat());
}

export const sendMessage = (msg) => {
  return (dispatch(sendChatRequest()))
    .then(() => dispatch(sendChatSuccess(msg)))
    .catch((err) => dispatch(sendChatFailure(err)));
}