import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Main } from './components/main/index';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Main />} />
    </Switch>
  </Router>
);

export default Root;
