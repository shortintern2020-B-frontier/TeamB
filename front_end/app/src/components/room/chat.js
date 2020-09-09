import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ActioncableProvider} from 'react-actioncable-provider';
import { connectToWebsocket, closeWebsocket, sendMessage } from '../../actions/chatAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ChatList } from './chatList';

const tokenSelector = (state) => state.auth.token;
const websocketSelector = (state) => state.chat.ws;

const Chat = () => {
  const token = useSelector(tokenSelector);
  const ws = useSelector(websocketSelector);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  let connection;

  const sendChat = (data) => {
    const msg = JSON.stringify({
      text: data.msg,
    });
    dispatch(sendMessage(ws, msg));
    reset();
  }

  useEffect(() => {
    dispatch(connectToWebsocket(token));
  }, []);

  return (
    <div>
      <p>chat</p>
      <ChatList />
      <form onSubmit={handleSubmit(sendChat)}>
        <TextField
          name="msg"
          label="チャット内容"
          inputRef={register}
        />
        <Button type="submit">送信</Button>
      </form>
    </div>
  );
};
export default Chat;
