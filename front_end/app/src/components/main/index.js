import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { getRooms } from '../../actions/roomAction';
import CreateRoomDialog from '../room/createRoomDialog';

const mainSelector = (state) => state.rooms;
const tokenSelector = (state) => state.auth.token;

export const RoomList = (rooms) => {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/rooms/${id}`);
  };

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
            <Button onClick={() => handleClick(room.id)}>入室</Button>
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
