import React from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from "react-custom-scrollbars";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  List: {
    height: "200px",
  },
});

const chatSelector = (state) => state.chat.msgs;

export const ChatList = () => {
  const msgs = useSelector(chatSelector);
  const classes = styles();

  return (
    <div className={classes.List}>
      <Scrollbars>
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