import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../settings/axios';
import { getRooms } from '../../actions/roomAction';
import CreateRoomDialog from '../room/createRoomDialog';

const mainSelector = (state) => state.rooms;

const tokenSelector = (state) => state.auth.token;

const check = () => {
  axios.get('http://localhost:5000/api/v1/hello#show')
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export const RoomList = (rooms) => {
  useEffect(() => {
    check();
  }, []);
  if (rooms.isFetching) {
    return (
      <p>loading</p>
    );
  }
  return (
    <ul>
      {
        rooms.rooms.map((room, index) => (
          <li key={index.toString()}>
            <p>
              { index }
              番目:
              {' '}
              { room.name }
            </p>
          </li>
        ))
      }
    </ul>
  );
};

export const Main = () => {
  const rooms = useSelector(mainSelector);
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(token));
  }, []);

  return (
    <div>
      <CreateRoomDialog />
      <RoomList {...rooms} />
    </div>
  );
};
