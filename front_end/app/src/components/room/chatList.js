import React from 'react';
import { useSelector } from 'react-redux';

const chatSelector = (state) => state.chat.msgs;

export const ChatList = () => {
  const msgs = useSelector(chatSelector);

  return (
    <ul>
      {
        msgs.map((msg, index) => (
          <li key={index.toString()}>
            <p>
              { index }
              番目:
              {' '}
              { msg }
            </p>
          </li>
        ))
      }
    </ul>
  );
};