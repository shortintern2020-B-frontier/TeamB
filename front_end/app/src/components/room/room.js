import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const roomSelector = (state) => state.room;

const Room = () => {
  const room = useSelector(roomSelector);
  const dispatch = useDispatch();

  return (
    <div>
      <p>room page</p>
      <p>room name is {room.name}</p>
    </div>
  )
}

export default Room;