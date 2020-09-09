/* 
*yuya miyata (designed)
*/
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ActioncableProvider} from 'react-actioncable-provider';
import { connectToWebsocket, closeWebsocket, sendMessage } from '../../actions/chatAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ChatList } from './chatList';

import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() =>({
  panel:{
    width:'25%',
    display: 'inline-block',
    'vertical-align':'top',
    margin:5,
  },
  botton:{
    marginTop:10,
    backgroundColor: '#f3f3f3',
  },
  paper:{
    padding:5,
  },
  submitPanel:{
    paddingLeft:100,
  }
})); 

const tokenSelector = (state) => state.auth.token;
const roomIdSelector = (state) => state.room.room.id;

const Chat = () => {
  const classes = useStyles();
  const token = useSelector(tokenSelector);
  const id = useSelector(roomIdSelector);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  let connection;

  const sendChat = (data) => {
    const msg = JSON.stringify({
      chat: {
        text: data.msg,
      },
    });
    console.log(msg);
    dispatch(sendMessage(msg, token, id));
    reset();
  }

  useEffect(() => {
    dispatch(connectToWebsocket(token));
  }, []);

  return (
    <div className={classes.panel}>
      <Paper className={classes.paper}>
      <ChatList/>
        <div >
          <form onSubmit={handleSubmit(sendChat)} className={classes.submitPanel}>
            <TextField
              name="msg"
              label="チャット内容"
              inputRef={register}
            />
            <Button type="submit" className={classes.botton}>送信</Button>
          </form>
        </div>
      </Paper>
    </div>
  );
};
export default Chat;
