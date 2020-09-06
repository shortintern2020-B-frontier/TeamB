import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers/rootReducer';
import Root from './root';

const App = () => (
  <Root />
);

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger),
);

const app = document.getElementById('app'); // eslint-disable-line no-undef
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  app,
);
