/* 
*yuya miyata (designed)
*/
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from "react-custom-scrollbars";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  List: {
    height: 400,
    'word-wrap': 'break-word',
  },
  ul:{
    paddingLeft:3,
  },
  chat:{
    'list-style':'none',
    'line-height':1,
  }
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
        <ul className={classes.ul}>
          {
            msgs.map((msg, index) => (
              <li key={index.toString()} className={classes.chat}>
                <p>
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