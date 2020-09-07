/*
* Designed by Yuya Miyata 
*/
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signup } from '../../actions/authAction';

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  textBox:{
    margin: 20,
  },
  formLayout:{
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

const Signup = () => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  /**
   * フォームの登録ボタンがクリックされた際に発火する
   * フォームに入力された内容を用いて登録処理を行う
   * @param {Object} data - 入力されたデータ
   * @param {string} data.name - ユーザー名
   * @param {string} data.password - パスワード
   */
  const Submit = (data) => {
    // jsonデータに変形してから投げる
    dispatch(signup(JSON.stringify(data)));
  };

  return (
    <div>
      <Paper className={classes.formLayout}>
      <AccountCircle fontSize = "large"/>
      <h2>登録</h2>
      <form onSubmit={handleSubmit(Submit)}>
        <TextField
          className={classes.textBox}
          name="name"
          label="ユーザー名"
          inputRef={register}
          variant="filled"
        />
        <TextField
          className={classes.textBox}
          name="password"
          label="パスワード"
          inputRef={register}
          variant="filled"
        />
        <Button className={classes.button} type="submit">
          登録
        </Button>
      </form>
      </Paper>
    </div>
  );
};

export default Signup;
