import { combineReducers } from 'redux';
import rooms from './roomReducer';
import auth from './authReducer';
import createRoom from './createRoomReducer';

const rootReducer = combineReducers({
  rooms,
  auth,
  createRoom,
});

export default rootReducer;
