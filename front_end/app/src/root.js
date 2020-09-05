import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Main } from './components/main/index';
import Toppage from './components/top/index';
import Signin from './components/auth/signin';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Main />} />
      <Route exact path="/signin" render={() => <Signin />} />
      <Route exact path="/toppage" render={() => <Toppage />} />
    </Switch>
  </Router>
);

export default Root;
