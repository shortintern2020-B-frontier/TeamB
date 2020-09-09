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
import { exitRoom } from '../../actions/roomAction';

const roomSelector = (state) => state.room.room;
const tokenSelector = (state) => state.auth.token;
const websocketSelector = (state) => state.chat.ws;
const userSelector = (state) => state.auth.id;
const BASE_URL ='https://www.youtube.com/embed/'

const Room = () => {
  const room = useSelector(roomSelector);
  const token = useSelector(tokenSelector);
  const ws = useSelector(websocketSelector);
  const id = useSelector(userSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [video,setVideo] = useState(`${BASE_URL}`)//yuyamiyata

  const handleOut = () => {
    dispatch(exitRoom(token, id, room.id));
    dispatch(closeWebsocket(ws));
    history.push('/');
  };

  useEffect(() => {
    const id = Number(location.pathname.replace(/[^0-9]/g, ''));
    // TODO: urlから取ったルームidが存在しない場合、メインページに飛ばす
  }, []);

  useEffect(()=>{
    const local_room = JSON.parse(localStorage.getItem('room'));
    if( local_room !== null ) {
      dispatch(setRoom(local_room));
    }
    setVideo(BASE_URL+room.youtube_id)
  },[room])

  return (
    <div>
      <p>room page</p>
      <iframe src={video}
        width = '480'
        height = '270'
        frameborder="10"/>
      <p>
        room name is
      {(() => {
        if( room === undefined ) {
          console.log(room);
          return (<p>not found</p>)
        } else {
          return (
            <div>
              <p>{room.name}</p>
            </div>
          )
        }
      })()}
      </p>
      <Chat />
      <Button onClick={handleOut}>退室</Button>
    </div>
  );
};

export default Room;
