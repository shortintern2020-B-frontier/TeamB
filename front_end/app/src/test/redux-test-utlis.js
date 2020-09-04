import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// export mockStore
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export { mockStore }; // eslint-disable-line import/prefer-default-export
