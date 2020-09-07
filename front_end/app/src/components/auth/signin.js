/*
* 
* designed by Yuya Miyata
*/
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { login } from '../../actions/authAction';

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {AccountCircle} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  textBox:{
    margin: 20,
  },
  formSpace:{
    margin: 'auto',
    width: 300,
    padding: 20,
    justify: 'center',
    textAlign: 'center',
  },
  button:{
    color:'white',
    backgroundColor: '#F03636',
  }
}))

const Signin = () => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  /**
   * フォームのログインボタンがクリックされた際に発火する
   * フォームに入力された内容を用いてログイン処理を行う
   * @param {Object} data - 入力されたデータ
   * @param {string} data.name - ユーザー名
   * @param {string} data.password - パスワード
   */
  const Submit = (data) => {
    // jsonデータに変形してから投げる
    dispatch(login(JSON.stringify(data)));
  };

  return (
    <div>
      <Paper className={classes.formSpace} elevation={5}>
          <AccountCircle fontSize = "large"/>
          <h2>ログイン</h2>
      
      <form onSubmit={handleSubmit(Submit)}>
        <div>
          <TextField
            className={classes.textBox}
            name="name"
            label="ユーザー名"
            inputRef={register}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            className={classes.textBox}
            name="password"
            label="パスワード"
            inputRef={register}
            variant="filled"
          />
        </div>
        <div>
          <Button className={classes.button}type="submit">
            ログイン
          </Button>
        </div>  
      </form>
      </Paper>
    </div>
  );
};

export default Signin;
