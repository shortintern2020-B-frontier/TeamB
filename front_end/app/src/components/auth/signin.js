import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { login } from '../../actions/authAction';



const Signin = () => {
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
    dispatch(login(data))
  }


  return (
    <div>
      <p>this is sign in page</p>
      <form onSubmit={handleSubmit(Submit)}>
        <TextField
          name="name"
          label="ユーザー名"
          inputRef={register}
        />
        <TextField
          name="password"
          label="パスワード"
          inputRef={register}
        />
        <Button type="submit">
          ログイン
        </Button>
      </form>
    </div>
  );
};

export default Signin;
