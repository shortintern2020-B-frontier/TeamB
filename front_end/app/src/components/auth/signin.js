/*
* designed by Yuya Miyata
*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { login } from '../../actions/authAction';
import Alert from '@material-ui/lab/Alert'; 

const useStyles = makeStyles(() => ({
  textBox: {
    margin: 20,
  },
  formSpace: {
    margin: 'auto',
    width: 300,
    padding: 20,
    justify: 'center',
    textAlign: 'center',
  },
  button: {
    color: 'white',
    backgroundColor: '#F03636',
  },
}));

const errorSelector = (state) => state.auth.login_error;

const Signin = () => {
  const classes = useStyles();
  const [msg, setMsg] = useState('');
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const err = useSelector(errorSelector);

  /**
   * フォームのログインボタンがクリックされた際に発火する
   * フォームに入力された内容を用いてログイン処理を行う
   * @param {Object} data - 入力されたデータ
   * @param {string} data.name - ユーザー名
   * @param {string} data.password - パスワード
   */
  const Submit = (data) => {
    const user = JSON.stringify({
      user: {
        name: data.name,
        password: data.password,
      },
    });
    if (data.name === '') {
      setMsg('ユーザー名が入力されていません');
    } else if (data.password === '') {
      setMsg('パスワードが入力されていません');
    } else {
      setMsg('');
      // jsonデータに変形してから投げる
      dispatch(login(user, history));
    }
  };

  return (
    <div>
      <Paper className={classes.formSpace} elevation={5}>
        <AccountCircle fontSize="large" />
        <h2>ログイン</h2>
        {(() => {
          if (err !== null && err !== undefined) {
            return (
              //karkawa
              <div>
                <Alert severity="error"> <strong> ユーザー名またはパスワードが違います</strong> </Alert>
              </div>
            );
          }else if(msg !== ""){
            return (
              <div>
                <Alert severity="error"> <strong> { msg } </strong> </Alert>
              </div>
            );
          }
          //karkawa
        })()}

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
              type="password"
              inputRef={register}
              variant="filled"
            />
          </div>
          <div>
            <Button className={classes.button} type="submit">
              ログイン
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Signin;
