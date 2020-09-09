import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { getRooms, enterRoom, setRoom } from '../../actions/roomAction';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const mainSelector = (state) => state.rooms;
const tokenSelector = (state) => state.auth.token;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: 'auto',
  },
  image: {
    margin: 50,
    // width: "30%",
  },
  enterRoom: {
    color: "white",
    "background-color": "#F03636"
  },
}));

export const RoomList = (rooms) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const classes = useStyles();

  const handleClick = (index, id) => {
    dispatch(enterRoom(token, rooms.rooms[index]))
    dispatch(setRoom(rooms.rooms[index]));
    history.push(`/rooms/${id}`);
  };

  if (rooms.isFetching) {
    return (
      <p>loading</p>
    );
  } else {
    // Hiranuma
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Rooms</ListSubheader>
          </GridListTile>
          {
            rooms.rooms.map((room, index) => (
              <GridListTile className={classes.image}>
                <img src={`http://img.youtube.com/vi/${room.youtube_id}/mqdefault.jpg`} alt={room.name} />
                <GridListTileBar
                  title={room.name}
                  actionIcon={
                    <Button onClick={() => handleClick(index, room.id)} variant="contained" className={classes.enterRoom} >入室</Button>
                  }
                />
                <Button onClick={() => handleClick(index, room.id)} variant="contained" >入室</Button>
              </GridListTile>
            )
          )}
        </GridList>
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
