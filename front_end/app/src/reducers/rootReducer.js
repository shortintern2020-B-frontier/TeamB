import { combineReducers } from 'redux';
import rooms from './roomReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  rooms,
  auth,
});

export default rootReducer;
