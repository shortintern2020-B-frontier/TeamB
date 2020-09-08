import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActioncableProvider} from 'react-actioncable-provider';
import Room from './room';
import { useHistory } from 'react-router-dom';

const tokenSelector = (state) => state.auth.token;

const ChatTest = () => {
  const token = useSelector(tokenSelector);

  const connection = new WebSocket('ws://localhost:5000/cable',token)
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
  return (
    <div>
    </div>
  );
};
export default ChatTest;
