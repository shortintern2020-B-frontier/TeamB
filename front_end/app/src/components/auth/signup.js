import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signup } from '../../actions/authAction';
import Header from '../header';

const Signup = () => {
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
      <Header />
      <p>this is sign up page</p>
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
          登録
        </Button>
      </form>
    </div>
  );
};

export default Signup;
