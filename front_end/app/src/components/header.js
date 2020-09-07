import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  const moveSingup = () => {
    history.push("/signup");
  }

  const moveLogin = () => {
    history.push("/signin");
  }

  return (
    <div>
      <Button onClick={moveSingup}>登録</Button>
      <Button onClick={moveLogin}>ログイン</Button>
    </div>
  )
}

export default Header;