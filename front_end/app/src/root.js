import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Main } from './components/main/index';
import Auth from './components/auth/auth';
import Toppage from './components/top/index';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import ChatTest from './components/room/chat';
const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/signin" render={() => <Signin />} />
      <Route exact path="/signup" render={() => <Signup />} />
      <Route exact path="/toppage" render={() => <Toppage />} />
      <Route exact path="/chat_test" render={() => <ChatTest />} />

      <Auth>
        <Switch>
          <Route exact path="/" render={() => <Main />} />
        </Switch>
      </Auth>
    </Switch>
  </Router>
);

export default Root;
