import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Main } from './components/main/index';
import Toppage from './components/top/index';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Main />} />
      <Route exact path="/toppage" render={() => <Toppage />} />
    </Switch>
  </Router>
);

export default Root;
