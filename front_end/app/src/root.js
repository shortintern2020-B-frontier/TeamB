import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header';
import { Main } from './components/main/index';
import Auth from './components/auth/auth';
import Toppage from './components/top/index';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import ChatTest from './components/room/chat';
import Room from './components/room/room';
import Tags from './components/tag/tags';

const Notfound = () => (
  <div> 404 not found</div>
);

const Root = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/signin" render={() => <Signin />} />
      <Route exact path="/signup" render={() => <Signup />} />
      <Route exact path="/toppage" render={() => <Toppage />} />
      <Route exact path="/chat_test" render={() => <ChatTest />} />

      <Auth>
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route exact path="/rooms/:id" render={() => <Room />} />
          <Route exact path="/tags" render={() => <Tags />} />
        </Switch>
      </Auth>
      <Route component={Notfound} />
    </Switch>
  </Router>
);

export default Root;
