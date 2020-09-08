import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getRoom } from '../../actions/roomAction';

const roomSelector = (state) => state.room;
const tokenSelector = (state) => state.auth.token;
const BASE_URL ='https://www.youtube.com/embed/'

const Room = () => {
  const room = useSelector(roomSelector);
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [video,videoId] = useState(`${BASE_URL}${room.room.youtube_id}`)//yuyamiyata

  const handleOut = () => {
    history.push('/');
  };

  useEffect(() => {
    const id = Number(location.pathname.replace(/[^0-9]/g, ''));
    // TODO: 存在しないroomの場合、メインページに飛ばす
    dispatch(getRoom(token, id));
  }, []);

  return (
    <div>
      <p>room page</p>
      <iframe src={video}
        width = '480'
        height = '270'
        frameborder="10"/>
      <p>
        room name is
        {room.room.name}
      </p>
      <Button onClick={handleOut}>退室</Button>
    </div>
  );
};

export default Room;
