/*
* YuyaMiyata
*/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getUsers} from '../../actions/userAction';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';  // Hiranuma
import users from '../../reducers/usersReducer';

const useStyles = makeStyles ((theme)=>({
  root:{
    flexGrow: 1,
    textAlign: "center",
  },
  main: {
    textAlign: "center",
  },
  paper:{
    margin:'auto',
    padding:20,
    width:600,
  },
  panel:{
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  userPanel:{
    backgroundColor: '#f3f3f3',
  },
  user:{
    display: 'inline-block',
    color: 'white',
    backgroundColor: '#F03636',
    maxHeight:30,
    flex: 1,
    flexDirection: 'row',
    margin:5,
    padding:3,
    textAlign: 'center',
  },
  button: {
    color: 'white',
    backgroundColor: '#3636F0',
    marinLeft:20,
  },
  left: {
    textAlign: "start",
  },
  alert: {
    margin: 8,
  }
}));

const tokenSelector = (state) => state.auth.token;
const userIDSelector = (state) => state.auth.id;
const usersSelector = (state) => state.users;
const errorSelector = (state) => state.users.error; // Hiranuma

export const UserList = (users) => {
  const classes = useStyles()
  if (users.isFetching) {
    return (
      <p>loading</p>
    );
  }else{
    return (
      <div>
        {
          users.users.map((user, index) =>(
            <div key={index.toString()}>
              name:{user.name}
  
            </div>
          ))
        }
      </div>
    );
  }

};


const Users = () => {
  const classes = useStyles()
  const token = useSelector(tokenSelector);
  const id = useSelector(userIDSelector);
  const users = useSelector(usersSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const [msg, setMsg] = useState('');   // Hiranuma
  const err = useSelector(errorSelector);   // Hiranuma

  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    dispatch(getUsers(token));
  }, []);


  return (
    <div className>
      <h2 className={classes.main}>Add Your Favorite</h2>
        <Paper className={classes.paper} elevation={5}>
 
          <Grid item>
          <p className={classes.left}>Users</p>
          <Paper elevation={0} variant="outlined" className={classes.userPanel, classes.left}>
            <UserList {...users} />
          </Paper>
          </Grid>
        </Paper>
    </div>
  );
};

export default Users;
