import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from "react-custom-scrollbars";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  List: {
    height: 450,
    'word-wrap': 'break-word',
  },
});

const chatSelector = (state) => state.chat.msgs;

export const ChatList = () => {
  const msgs = useSelector(chatSelector);
  const classes = styles();
  const scrollbars = useRef();

  const updateScrollbar = () => {
    scrollbars.current.scrollToBottom();
  }

  return (
    <div className={classes.List}>
      <Scrollbars onUpdate={updateScrollbar} ref={scrollbars}>
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
      </Scrollbars>
    </div>
  );
};