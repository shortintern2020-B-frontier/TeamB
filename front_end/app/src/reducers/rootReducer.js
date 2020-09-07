import { combineReducers } from 'redux';
import posts from './postReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  posts,
  auth,
});

export default rootReducer;
