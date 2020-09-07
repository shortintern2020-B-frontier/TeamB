import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRoom } from '../../actions/roomAction';

const roomSelector = (state) => state.room;

const Room = () => {
  const room = useSelector(roomSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const id = Number(location.pathname.replace(/[^0-9]/g, ''));
    dispatch(getRoom(id));
  }, [])

  return (
    <div>
      <p>room page</p>
      <p>room name is {room.name}</p>
    </div>
  )
}

export default Room;