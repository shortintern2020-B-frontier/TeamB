/*
*yuya miyata (designed)
*/
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ActioncableProvider} from 'react-actioncable-provider';
import { connectToWebsocket, closeWebsocket, sendMessage } from '../../actions/chatAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ChatList } from './chatList';

import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert'; 

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
    width: 70,
    flex:1,
  },
  paper:{
    padding:10,
    paddingRight:20,
    'box-sizing':'border-box',
  },
  submitPanel:{
    padding:3,
    flex:1,
  },
  sendIcon:{
    marginLeft:5,
    fontSize:'large',
  }
})); 

const tokenSelector = (state) => state.auth.token;
const roomIdSelector = (state) => state.room.room.id;

const Chat = () => {
  const classes = useStyles();
  const token = useSelector(tokenSelector);
  const id = useSelector(roomIdSelector);
  const { register, handleSubmit, reset } = useForm();
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  let connection;

  const sendChat = (data) => {
    if( data.msg === "" ) {
      console.log("test")
      setErr('チャット内容が空です');
    } else {
      setErr('');
      const msg = JSON.stringify({
        chat: {
          text: data.msg,
        },
      });
      dispatch(sendMessage(msg, token, id));
    }
    reset();
  }

  useEffect(() => {
    dispatch(connectToWebsocket(token));
  }, []);

  return (
    <div className={classes.panel}>
      <Paper className={classes.paper}>
        <ChatList/>
      <form onSubmit={handleSubmit(sendChat)}>
        <Grid container>
            <TextField
              name="msg"
              label="チャット内容"
              inputRef={register}
              fullWidth
            />
        </Grid>
        {(() => {
          if(err !== ""){
            return (
              <div>
                <Alert severity="error"> <strong> { err } </strong> </Alert>
              </div>
            );
          }
          //karkawa
        })()}
        <Grid container className={classes.submitPanel}>
            <Button type="submit" className={classes.botton}>
              送信
              <SendIcon className={classes.sendIcon}/>
              </Button>
        </Grid>
      </form>
      </Paper>
    </div>
  );
};
export default Chat;
