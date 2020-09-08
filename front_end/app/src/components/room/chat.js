import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ActioncableProvider} from 'react-actioncable-provider';
import { connectToWebsocket, closeWebsocket, sendMessage } from '../../actions/chatAction';
import Button from '@material-ui/core/Button';

const tokenSelector = (state) => state.auth.token;

const Chat = () => {
  const token = useSelector(tokenSelector);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  let connection;

  useEffect(() => {
    dispatch(connectToWebsocket(token));
    /*
    connection = new WebSocket('ws://localhost:5000/cable?token='+token)
    connection.onopen = function(){
      connection.send('Ping');
    }
      // Log errors
    connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
      console.log('Server: ' + e.data);
    };
    */
  }, []);

  return (
    <div>
      <p>chat</p>
    </div>
  );
};
export default Chat;
