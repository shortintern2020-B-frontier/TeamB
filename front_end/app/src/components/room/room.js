/* 
*yuya miyata (youtube api)
*/
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Chat from './chat';
import { closeWebsocket } from '../../actions/chatAction';
import { setRoom } from '../../actions/roomAction';
import { exitRoom } from '../../actions/roomAction';
import {getRoomUsers} from '../../actions/roomAction';
import {enterUser} from '../../actions/userAction';
import { makeStyles } from '@material-ui/core/styles';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitIcon from '@material-ui/icons/TransitEnterexit';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(() => ({
  root:{
    paddingLeft:150,
    paddingRight:150,
  },
  video: {
    display: 'inline-block',
    width: '70%',
    height: 500,
    margin: 10,
  },
  botton: {
    marginTop: 20,
    color: 'white',
    backgroundColor: '#3636F0',
  },
  texts: {
    margin: 20,
  },
  grid:{
    justify:'flex-start',
  },
}));
const roomUsersSelector = (state) => state.roomUsers;
const roomSelector = (state) => state.room.room;
const tokenSelector = (state) => state.auth.token;
const websocketSelector = (state) => state.chat.ws;
const BASE_URL = 'https://www.youtube.com/embed/'

export const RoomUsers = (roomUsers) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const history = useHistory();

  const handleClick =(index)=>{
    dispatch(enterUser(token,history,roomUsers.roomUsers[index]))
  }
  if (roomUsers.isFetching) {
    return (
      <p>loading</p>
    );
  }
  return (
    <div>
      "入室中のユーザ一覧"
    { 
      roomUsers.roomUsers.map((user, index) =>(
        <Button onClick={() => handleClick(index)} variant="contained"  >{user.name}</Button>
        ))
    }
  </div>
  );
}
const Room = () => {
  const classes = useStyles();
  const room = useSelector(roomSelector);
  const token = useSelector(tokenSelector);
  const ws = useSelector(websocketSelector);
  const roomUsers = useSelector(roomUsersSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [video, setVideo] = useState(`${BASE_URL}`)//yuyamiyata

  const handleOut = () => {
    dispatch(exitRoom(token));
    dispatch(closeWebsocket(ws));
    history.push('/');
  };

  useEffect(() => {
    dispatch(getRoomUsers(token));
    const id = Number(location.pathname.replace(/[^0-9]/g, ''));
    // TODO: urlから取ったルームidが存在しない場合、メインページに飛ばす
  }, []);

  useEffect(() => {
    setVideo(BASE_URL + room.youtube_id)
  }, [room])


  return (
    <div className={classes.root}>
      <iframe src={video}
        className={classes.video}
        frameborder="0" />
      <Chat className={classes.chat} />
      <h3 className={classes.texts}>
        {(() => {
          if (room === undefined) {
            console.log(room);
            return (<p>not found</p>)
          } else {
            if (room.is_private) {
              return (
                <div>
                  <h1>{room.name} <LockRoundedIcon fontSize="large" /></h1>
                </div>
              )
            } else {
              return (
                <div>
                  <h1>{room.name} <LockOpenIcon fontSize="large" /></h1>
                </div>
              )
            }
          }
        })()}
      </h3>
      <Grid container className={classes.grid}>
      <Grid items xs={10}>
      <h4 className={classes.texts}>
        {room.start_time}
      </h4>
      </Grid>
      <Grid items xs={2}>
      <div>
        <Button onClick={handleOut} className={classes.botton}>ルーム退室 <ExitIcon/></Button>
      </div>
      </Grid>
      </Grid>
      <RoomUsers {...roomUsers}/>
    </div>
  );
};

export default Room;
