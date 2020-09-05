import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import rootReducer from './reducers/rootReducer';
import Root from './root';

const App = () => (
  <Root />
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger),
);

const persist_store = persistStore(store)

const app = document.getElementById('app'); // eslint-disable-line no-undef
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist_store}>
      <App />
    </PersistGate>
  </Provider>,
  app,
);
