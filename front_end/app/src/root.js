import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Main } from './components/main/index';
import Auth from './components/auth/auth';
import Toppage from './components/top/index';
import Signin from './components/auth/signin';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Main />} />
      <Route exact path="/signin" render={() => <Signin />} />
      <Route exact path="/toppage" render={() => <Toppage />} />
      <Route component={Auth}>

      </Route>
    </Switch>
  </Router>
);

export default Root;
