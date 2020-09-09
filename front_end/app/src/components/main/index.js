import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { getRooms, enterRoom } from '../../actions/roomAction';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { useForm } from 'react-hook-form';
import { searchRooms, searchUserRooms } from '../../actions/roomAction';

const mainSelector = (state) => state.rooms;
const tokenSelector = (state) => state.auth.token;
const tagSelector = (state) => state.userTags.tags;

export const RoomList = (rooms) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const handleClick = (index) => {
    dispatch(enterRoom(token, history, rooms.rooms[index]))
  };

  if (rooms.isFetching) {
    return (
      <p>loading</p>
    );
  } else {
    return (
      <ul>
        {
          rooms.rooms.map((room, index) => (
            <li key={index.toString()}>
              <p>
                { index }
                番目:
                {' '}
                { room.name }
              </p>
              <Button onClick={() => handleClick(index)}>入室</Button>
            </li>
          ))
        }
      </ul>
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

  useEffect(() => {
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
      <form onSubmit={handleSubmit(Search)}>
        <Select
          labelId="関連タグ"
          value={selectedTag}
          onChange={handleChange}
        >
          {(() => {
            const result = [];
            tags.map((tag) => {
              result.push(
                <p value={tag}>{tag.name}</p>
              )
            });
            return result;
          })()}
        </Select>
        <Button type="submit">検索</Button>
      </form>
      <div>

      </div>
      <RoomList {...rooms} />
    </div>
  );
};
