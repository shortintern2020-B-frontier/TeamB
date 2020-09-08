import axios from '../settings/axios';

export const INIT_CHAT = 'INIT_CHAT';
export const initChat = (ws) => ({
  type: INIT_CHAT,
  ws,
  receivedAt: Date.now(),
});

export const POST_CHAT = 'POST_CHAT';
export const postChat = (msg) => ({
  type: POST_CHAT,
  msg,
  receivedAt: Date.now(),
});

export const CLOSE_CHAT = 'CLOSE_CHAT';
export const closeChat = () => ({
  type: CLOSE_CHAT,
});

export const RECEIVE_CHAT = 'RECEIVE_CHAT';
export const receiveChat = (msg) => ({
  type: RECEIVE_CHAT,
  msg,
  receivedAt: Date.now(),
})

export const connectToWebsocket = (token) => (dispatch) => {
  const ws = new WebSocket('ws://localhost:5000/cable?token='+token);
  ws.onopen = () => {
    ws.send('Ping');
  };

  ws.onerror = (error) => {
    console.log('WebSocket Error ' + error);
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    console.log('Server: ' + e.data);
    if( msg.type !== "welcome") {
      dispatch(receiveMessage(msg.message));
    }
  };
  dispatch(initChat(ws));
}

export const closeWebsocket = () => (dispatch) => {
  dispatch(closeChat());
}

export const sendMessage = (msg) => (dispatch) => {
  dispatch(sendChatSuccess(msg));
}

export const receiveMessage = (msg) => (dispatch) => {
  dispatch(receiveChat(msg));
}