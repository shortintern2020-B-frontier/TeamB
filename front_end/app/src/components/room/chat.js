import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActioncableProvider} from 'react-actioncable-provider';
import Room from './room';
import { useHistory } from 'react-router-dom';

const tokenSelector = (state) => state.auth.token;

const ChatTest = () => {
  let connection;
  const token ='eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJleHAiOjE2MDAxNDAxMzd9.2DDXNKp-yH0e74m9Jtg-GAFzL786WDjucHdArIWLnnU';// useSelector(tokenSelector);
  console.log(token)
  useEffect(() => {
    connection = new WebSocket('ws://localhost:5000/cable?token='+token)
    console.log(connection)
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
  }, []);

  return (
    <div>
    </div>
  );
};
export default ChatTest;
