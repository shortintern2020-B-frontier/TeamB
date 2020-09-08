import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const Toppage = () => {
  const history = useHistory();

  const moveSignupPage = () => {
    history.push('/signup');
  };

  const moveLoginPage = () => {
    history.push('/login');
  };

  return (
    <div>
      <p>this is top page</p>
      <Button onClick={moveSignupPage}>
        登録
      </Button>
      <Button onClick={moveLoginPage}>
        ログイン
      </Button>
    </div>
  );
};
export default Toppage;
