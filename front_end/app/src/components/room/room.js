import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRoom } from '../../actions/roomAction';

const roomSelector = (state) => state.room;
const tokenSelector = (state) => state.auth.token;

const Room = () => {
  const room = useSelector(roomSelector);
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const id = Number(location.pathname.replace(/[^0-9]/g, ''));
    // TODO: 存在しないroomの場合、メインページに飛ばす
    dispatch(getRoom(token, id));
  }, []);

  return (
    <div>
      <p>room page</p>
      <p>
        room name is
        {room.room.name}
      </p>
    </div>
  );
};

export default Room;
