import axios from '../settings/axios';

export const INIT_CHAT = 'INIT_CHAT';
export const initChat = (ws) => ({
  type: INIT_CHAT,
  ws,
  receivedAt: Date.now(),
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
    var msg={"command":"subscribe","identifier":"{\"channel\":\"RoomChannel\"}"}
    ws.send(JSON.stringify(msg));
  };

  ws.onerror = (error) => {
    console.log('WebSocket Error ' + error);
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if( msg.type !== "welcome" && msg.type !== "ping" && msg.type !== "confirm_subscription" ) {
      console.log(msg.message)
      let chat_info=msg.message;
      dispatch(receiveMessage(chat_info.name+" "+chat_info.text));
    }
  };
  dispatch(initChat(ws));
}

export const closeWebsocket = (ws) => (dispatch) => {
  ws.close();
  dispatch(closeChat());
}

export const sendMessage = (msg, token, room_id) => (dispatch) => {
  dispatch(postChatRequest());
  return axios.post(`http://localhost:5000/api/v1/rooms/${room_id}/chats`, msg, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(postChatSuccess(res.data.data.chat.text));
    })
    .catch((err) => dispatch(postChatFailure(err)));
}

export const receiveMessage = (msg) => (dispatch) => {
  dispatch(receiveChat(msg));
}