import { combineReducers } from 'redux';
import rooms from './roomsReducer';
import room from './roomReducer';
import auth from './authReducer';
import createRoom from './createRoomReducer';
import tags from './tagReducer';
import userTags from './userTagReducer';

const rootReducer = combineReducers({
  rooms,
  room,
  auth,
  createRoom,
  tags,
  userTags,
});

export default rootReducer;
