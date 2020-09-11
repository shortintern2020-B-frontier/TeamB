/**
 * author: hiranuma
 *
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CreateRoomDialog from './room/createRoomDialog';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { logout } from '../actions/authAction';

import LoyaltyIcon from '@material-ui/icons/Loyalty';
import RoomIcon from '@material-ui/icons/Room';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    'margin-bottom': 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    'background-color': '#F03636',
  },
  link: {
    color: 'white',
    backgroundColor: '#F03636',
    cursor: "pointer",
    "font-family": "Helvetica Neue",
    "text-decoration": "none",
    "padding": 7,
    textAligin:"left",
  },
  theaTalk: {
    color: 'white',
    backgroundColor: '#F03636',
    "font-size": 30,
    "font-family": "sans-serif",
    cursor: "pointer",
    "text-decoration": "none",
  },
  logo:{
    width:"200px",
    height:"auto",
    cursor: "pointer",
  },
  grow:{
    flexGrow:1,
  }
  
}));

export const AuthSelector = (state) => state.auth;

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const auth = useSelector(AuthSelector);
  const dispatch = useDispatch();

  const moveSignup = () => {
    history.push('/signup');
  };

  const moveLogin = () => {
    history.push('/signin');
  };

  const moveRooms = () => {
    history.push('/');
  };

  const moveTags = () => {
    history.push('/tags');
  };

  const moveTop = () => {
    history.push('/toppage');
  }

  const logoutDone = () => {
    // Todo: localstrageと状態の破棄
    localStorage.clear();
    dispatch(logout());
    moveTop();
  }

  if (auth.isLoggedIn) {
    return (
      <header className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <img src={`${window.location.origin}/images/logo.gif`} className={classes.logo} onClick={moveRooms}/>
            <div className={classes.grow}/>
            <CreateRoomDialog />
            <Link onClick={moveTags} className={classes.link}>Tags<LoyaltyIcon fontSize="large" /></Link>
            <Link onClick={moveRooms} className={classes.link}>Rooms<RoomIcon fontSize="large" /></Link>
            <Link onClick={logoutDone} className={classes.link}>Logout<ExitToAppIcon fontSize="large" /></Link>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
  return (
    <header className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img src={`${window.location.origin}/images/logo.gif`} className={classes.logo} onClick={moveRooms}/>
          <div className={classes.grow}/>
          <Link onClick={moveSignup} className={classes.link}>SignUp</Link>
          <Link onClick={moveLogin} className={classes.link}>Login</Link>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
