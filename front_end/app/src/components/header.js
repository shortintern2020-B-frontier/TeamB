/**
 * author: hiranuma
 *
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

const Header = () => {
  const history = useHistory();

  const classes = useStyles();

  const moveSignup = () => {
    history.push('/signup');
  };

  const moveLogin = () => {
    history.push('/signin');
  };

  const moveRooms = () => {
    history.push('/');
  };

  return (
    <header className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TheaTalk
          </Typography>
          <Button onClick={moveSignup}>Sign Up</Button>
          <Button onClick={moveLogin}>Login</Button>
          <Button onClick={moveRooms}>Rooms</Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
