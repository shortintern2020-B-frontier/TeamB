/* 
*yuya miyata (youtube api)
*/
import React, { useEffect , useState} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Chat from './chat';
import { closeWebsocket } from '../../actions/chatAction';
import { setRoom } from '../../actions/roomAction';

const roomSelector = (state) => state.room.room;
const tokenSelector = (state) => state.auth.token;
const websocketSelector = (state) => state.chat.ws;
const BASE_URL ='https://www.youtube.com/embed/'

const Room = () => {
  const room = useSelector(roomSelector);
  const token = useSelector(tokenSelector);
  const ws = useSelector(websocketSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [video,setVideo] = useState(`${BASE_URL}`)//yuyamiyata

  const handleOut = () => {
    dispatch(closeWebsocket(ws));
    history.push('/');
  };

  useEffect(() => {
    const id = Number(location.pathname.replace(/[^0-9]/g, ''));
    // TODO: urlから取ったルームidが存在しない場合、メインページに飛ばす
  }, []);

  useEffect(()=>{
    const localId = localStorage.getItem('room');
    if( localId !== null && localId !== undefined ) {
      console.log('##################')
      console.log(localId);
      dispatch(setRoom(localId));
    }
    setVideo(BASE_URL+room.youtube_id)
  },[])

  return (
    <div>
      <p>room page</p>
      <iframe src={video}
        width = '480'
        height = '270'
        frameborder="10"/>
      <p>
        room name is
        {room.name}
      </p>
      <Chat />
      <Button onClick={handleOut}>退室</Button>
    </div>
  );
};

export default Room;
