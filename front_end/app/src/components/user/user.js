/* 
*yuya miyata (youtube api)
*/
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { setUser } from '../../actions/userAction';
import { exitUser } from '../../actions/userAction';
import {getUsers} from '../../actions/roomAction';
import { makeStyles } from '@material-ui/core/styles';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(() => ({
  video: {
    display: 'inline-block',
    width: '70%',
    height: 500,
    margin: 10,
  },
  botton: {
    marginLeft: 20,
    color: 'white',
    backgroundColor: '#3636F0',
  },
  texts: {
    margin: 20,
  }
}));

const userSelector = (state) => state.user.user;
const tokenSelector = (state) => state.auth.token;

const User = () => {
  const classes = useStyles();
  const user = useSelector(userSelector);
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleOut = () => {
    dispatch(exitUser(token));
    history.push('/');
  };



  useEffect(() => {
    setUser(user.id)
  }, [user])


  return (
    <div>
      <div>
        <Button onClick={handleOut} className={classes.botton}>フォローボタン</Button>
        <h3 className={classes.name}>
        {(() => {
          if (user === undefined) {
            console.log(user);
            return (<p>not found</p>)
          } else {
              return (
                <div>
                  <h1>{user.name} <LockOpenIcon fontSize="large" /></h1>
                </div>
              )
            
          }
        })()}
      </h3>
      </div>
        {user.name}
    </div>
  );
};

export default User;
