/**
 * Author: Hiranuma Tomoyuki
 * Date: 20200908
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  textBox: {
    margin: 20,
  },
  formSpace: {
    margin: 'auto',
    padding: 20,
    justify: 'center',
    textAlign: 'center',
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
  }
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
    <div  className={classes.formSpace}>
      <div>
        <h2>「好み」でつながるコミュニケーションツール</h2>
        <h1>TheaTalk</h1>
      </div>
      <img src={`${window.location.origin}/images/GAZO.png}`} />
      <Button className={classes.buttonSignUp} onClick={moveSignupPage} variant="contained" >
        Sign up
      </Button>
      <Button className={classes.buttonLogin} onClick={moveLoginPage} variant="contained">
        Login
      </Button>
    </div>
  );
};
export default Toppage;
