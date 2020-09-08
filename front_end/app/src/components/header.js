/**
 * author: hiranuma
 *
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CreateRoomDialog from './room/createRoomDialog';

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
}));

export const AuthSelector = (state) => state.auth;

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const auth = useSelector(AuthSelector);

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

  if (auth.isLoggedIn) {
    return (
      <header className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              TheaTalk
            </Typography>
            <CreateRoomDialog />
            <Button onClick={moveTags}>Tags</Button>
            <Button onClick={moveRooms}>Rooms</Button>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
  return (
    <header className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TheaTalk
          </Typography>
          <Button onClick={moveSignup}>Sign Up</Button>
          <Button onClick={moveLogin}>Login</Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
