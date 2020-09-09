/* 
*yuya miyata (youtube api)
*/
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { setUser } from '../../actions/userAction';
import { exitUser } from '../../actions/userAction';
import {getUser} from '../../actions/userAction';
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

const userSelector = (state) => state.user;
const tokenSelector = (state) => state.auth.token;
export const UserPrint = (user) => {
  const classes = useStyles()
  if (user.isFetching) {
    return (
      <p>loading</p>
    );
  }
  console.log(user.user)
  return (
    <div>
      {
        <div>
          user_name {user.user.name }
        </div>
      }
    </div>
  );
};
const User = () => {
  const classes = useStyles();
  const user = useSelector(userSelector);
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleOut = () => {
    history.push('/');
  };

  useEffect(() => {
    const id = Number(location.pathname.replace(/[^0-9]/g, ''));
    dispatch(getUser(id));
  }, [])


  return (
    <div>
      <UserPrint {...user} />
    </div>
  );
};

export default User;
