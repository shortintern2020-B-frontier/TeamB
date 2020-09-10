import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { getRooms, enterRoom } from '../../actions/roomAction';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useForm } from 'react-hook-form';
import { searchRooms, searchUserRooms } from '../../actions/roomAction';

const mainSelector = (state) => state.searchedRoom;
const tokenSelector = (state) => state.auth.token;
const tagSelector = (state) => state.userTags.tags;

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
  },
  formRoot: {
    "margin-left": "42%",
  },
  formWidth: {
    minWidth: 300,
    "min-width": 300,
  },
  form: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  search: {
    'margin-left': '300',
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
        {/* Roomsを表示するかどうかによってコメントを外す */}
        {/* <Typography variant="h4" gutterBottom>
            Rooms
        </Typography> */}

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
  const tags = useSelector(tagSelector);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [selectedTag, setSelectedTag] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(searchUserRooms());
    dispatch(getRooms(token));
  }, []);

  const handleChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const Search = () => {
    //dispatch(searchUserRooms(selectedTag.id));
    dispatch(searchRooms(selectedTag.id));
  }

  return (
    <div>
      <div className={classes.formRoot}>
      <form onSubmit={handleSubmit(Search)} className={classes.form}>
        <FormControl className={classes.formWidth}>
          <InputLabel id="search">Search rooms</InputLabel>
          <Select
            id="search"
            labelId="関連タグ"
            value={selectedTag}
            onChange={handleChange}
            className={classes.search}
          >
            {(() => {
              const result = [];
              tags.map((tag) => {
                result.push(
                  <MenuItem value={tag}>{tag.name}</MenuItem>
                )
              });
              return result;
            })()}
          </Select>
          <Button type="submit">検索</Button>
        </FormControl>
      </form>
      </div>
      <div>
      </div>
      <RoomList {...rooms} />
    </div>
  );
};
