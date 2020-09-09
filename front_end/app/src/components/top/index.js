/**
 * Author: Hiranuma Tomoyuki
 * Date: 20200908
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AuthSelector } from '../header';

const useStyles = makeStyles(() => ({
  root: {
    margin: 'auto',
    height: 800,
    "padding-top": 20,
    justify: 'center',
    textAlign: 'center',
    "font-size": 20,
  },
  image: {
    "background": `url(${window.location.origin}/images/image.png)`,
    "background-size": "contain",
  },
  buttonSignUp: {
    color: 'white',
    backgroundColor: '#F03636',
    margin: 8,
  },
  buttonLogin: {
    color: 'white',
    backgroundColor: "gray",
    margin: 8,
  },
}));

const Toppage = () => {
  const classes = useStyles();
  const history = useHistory();

  const moveSignupPage = () => {
    history.push('/signup');
  };

  const moveLoginPage = () => {
    history.push('/login');
  };

  return (
    <div className={classes.image}>
      <div  className={classes.root}>
        <div>
          <h2>「好み」でつながるコミュニケーションツール</h2>
          <h1>TheaTalk</h1>
        </div>
        <Button className={classes.buttonSignUp} onClick={moveSignupPage} variant="contained" >
          Sign up
        </Button>
        <Button className={classes.buttonLogin} onClick={moveLoginPage} variant="contained">
          Login
        </Button>
      </div>
    </div>
  );
};
export default Toppage;
