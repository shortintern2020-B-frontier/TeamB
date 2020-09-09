import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { getRooms, enterRoom } from '../../actions/roomAction';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const mainSelector = (state) => state.rooms;
const tokenSelector = (state) => state.auth.token;

// Hiranuma
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 350,
    height: 200,
    margin: 30,
  },
  enterRoom: {
    padding: 2,
    color: "white",
    "background-color": "#F03636",
    margin: 5,
  },
  box: {
    height: 300,
    width: 400,
    cols: 3,
  }
}));
// Hiranuma

export const RoomList = (rooms) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const classes = useStyles();

  const handleClick = (index) => {
    dispatch(enterRoom(token, history, rooms.rooms[index]))
  };

  if (rooms.isFetching) {
    return (
      <p>loading</p>
    );
  } else {
    // Hiranuma
    return (
      <div>
        <Typography variant="h4" gutterBottom>
            Rooms
        </Typography>
      <div className={classes.root}>
          {
            rooms.rooms.map((room, index) => (
              <Box display="inline" flexWrap="wrap" justifyContent="center" flexWrap="wrap" >
                <div className={classes.box}>
                  <GridListTile className={classes.image} key={index.toString()} component="div">
                    <img src={`http://img.youtube.com/vi/${room.youtube_id}/mqdefault.jpg`} alt={room.name} />
                    <GridListTileBar
                      title={room.name}
                      subtitle={room.start_time}
                      actionIcon={
                        <Button onClick={() => handleClick(index)} variant="contained" className={classes.enterRoom} >入室</Button>
                      }
                    />
                  </GridListTile>
                </div>
              </Box> 
            )
          )}
      </div>
      </div>
    // Hiranuma
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
