import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import { getRooms, enterRoom } from '../../actions/roomAction';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
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
    height: 230,
    width: 400,
    cols: 3,
  },
  formRoot: {
    "margin-left": "42%",
  },
  formWidth: {
    minWidth: 300,
    "min-width": 300,
    "margin-bottom": 40,
  },
  form: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  search: {
    'margin-left': '300',
  },
  searchButton: {
    "backgroundColor": "#1e90ff",
  },
  eachCard: {
    'margin-bottom': 20,
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
      <div className={classes.root}>
          {
            rooms.rooms.map((room, index) => (
              <Card variant="outlined" className={classes.eachCard}>
              <Box display="inline" flexWrap="wrap" justifyContent="center" >
                <div className={classes.box}>
                  <GridListTile className={classes.image} key={index.toString()} component="div">
                    <img src={`http://img.youtube.com/vi/${room.youtube_id}/mqdefault.jpg`} alt={room.name} />
                    <GridListTileBar
                      title={room.name}
                      subtitle={(() => {
                        if( room.start_time !== undefined ) {
                          const time = room.start_time.split(/-+|T+|:+|\.+/);
                          const year = time[0];
                          const month = time[1];
                          const day = time[2];
                          const hour = time[3];
                          const minite = time[4];
                          const now_time = new Date();
                          const now_year = now_time.getFullYear();
                          const now_month = now_time.getMonth()+1;
                          const now_day = now_time.getDate();
                          const now_hour = now_time.getHours();
                          const now_minite = now_time.getMinutes();
                          const now_seconds = now_time.getSeconds();
                          let date = year + "-" + month + "-" + day + " " + hour + ":" + minite;
                          if( year >= now_year && month >= now_month && day >= now_day && hour > now_hour) {
                            let minite_ = Number((hour - now_hour)*60) + Number(minite - now_minite);
                            console.log(minite_);
                            if( minite_ > 60 ) {
                              date = "Starting in " + ( Math.round(minite_/60)).toString() + " hour " + (minite_%60).toString() + " minute";
                            } else {
                              date = "Starting in " + (minite_%60).toString() + " minute";
                            }
                          }
                          return(
                            date
                          )
                        }
                      })()}
                      actionIcon={
                        <Button onClick={() => handleClick(index)} variant="contained" className={classes.enterRoom} >入室</Button>
                      }
                    />
                  </GridListTile>
                </div>
              </Box>
              </Card>
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
          <Button type="submit" variant="contained" color="primary" className={classes.searchButton}>検索<SearchIcon color="white" /></Button>
        </FormControl>
      </form>
      </div>
      <div>
      </div>
      <RoomList {...rooms} />
    </div>
  );
};
