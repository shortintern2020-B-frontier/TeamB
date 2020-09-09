import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { getRooms, enterRoom } from '../../actions/roomAction';

const mainSelector = (state) => state.rooms;
const tokenSelector = (state) => state.auth.token;

export const RoomList = (rooms) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const handleClick = (index) => {
    dispatch(enterRoom(token, history, rooms.rooms[index]))
  };

  if (rooms.isFetching) {
    return (
      <p>loading</p>
    );
  } else {
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
              <Button onClick={() => handleClick(index)}>入室</Button>
            </li>
          ))
        }
      </ul>
    );
  }
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
      <RoomList {...rooms} />
    </div>
  );
};
