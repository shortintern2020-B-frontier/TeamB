/* 
*yuya miyata (youtube api)
*/
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getUser} from '../../actions/userAction';
import { makeStyles } from '@material-ui/core/styles';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    margin:15,
  },
  paper:{
    margin:100,
    padding:15,
  },
  icon: {
    marginTop: 7,
    marginRight: 10,
  },
  texts: {
    margin:0,
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
          <h1 className={classes.texts}>{user.user.name }</h1>
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
    <div className={classes.root}>
      <Paper evaluation={5} className={classes.paper}>
        <Grid container>
          <Grid items={0}>
            <AccountIcon fontSize="large" className={classes.icon}/>
          </Grid>
          <Grid items={0}>
            <UserPrint {...user} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default User;
