import React from 'react';
import { ActioncableProvider} from 'react-actioncable-provider';
import Room from './room';
import { useHistory } from 'react-router-dom';

const ChatTest = () => {
  const connection = new WebSocket('ws://localhost:5000/cable',jwt_token)
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
