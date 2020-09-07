import { combineReducers } from 'redux';
import rooms from './roomReducer';
import auth from './authReducer';
import create_room from './createRoomReducer';

const rootReducer = combineReducers({
  rooms,
  auth,
  create_room,
});

export default rootReducer;
