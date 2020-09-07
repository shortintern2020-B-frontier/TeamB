import { combineReducers } from 'redux';
import rooms from './roomsReducer';
import room from './roomReducer';
import auth from './authReducer';
import createRoom from './createRoomReducer';

const rootReducer = combineReducers({
  rooms,
  room,
  auth,
  createRoom,
});

export default rootReducer;
