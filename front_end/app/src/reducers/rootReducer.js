import { combineReducers } from 'redux';
import rooms from './roomsReducer';
import room from './roomReducer';
import auth from './authReducer';
import createRoom from './createRoomReducer';
import tags from './tagReducer';
import userTags from './userTagReducer';
import chat from './chatReducer';
import searchedRoom from './searchedRoomsReducer';
import users from './usersReducer';
import user from './userReducer';
import roomUsers from './roomUsersReducer'

const rootReducer = combineReducers({
  rooms,
  room,
  auth,
  createRoom,
  tags,
  userTags,
  chat,
  searchedRoom,
  users,
  user,
  roomUsers
});

export default rootReducer;
