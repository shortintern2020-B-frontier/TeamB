import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/rootReducer';

function render(
  ui,
  {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk, logger),
    ),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) { // eslint-disable-line react/prop-types
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
export * from '@testing-library/jest-dom';
export * from '@jest/globals'; // eslint-disable-line import/no-extraneous-dependencies

// override render method
export { render };
