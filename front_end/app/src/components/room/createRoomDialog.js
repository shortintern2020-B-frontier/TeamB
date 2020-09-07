import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

import { openRoomDialog, closeRoomDialog, createRoom } from '../../actions/createRoomAction';
import { getRooms } from '../../actions/roomAction';

const createRoomSelector = (state) => state.createRoom;
const tokenSelector = (state) => state.auth.token;
// TODO: 実際のAPIを叩く時にidの情報は不要なので削除
const roomSelector = (state) => state.rooms;

const CreateRoomDialog = () => {
  const createRoomProps = useSelector(createRoomSelector);
  const token = useSelector(tokenSelector);

  // TODO: 実際のAPIを叩く時にidの情報は不要なので削除
  const rooms = useSelector(roomSelector);

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  // 動画ルームを非公開にするかどうか
  const [isPrivate, setIsPrivate] = useState(true);

  // 開始時間
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleOpen = () => {
    dispatch(openRoomDialog());
  };

  const handleClose = () => {
    dispatch(closeRoomDialog());
  };

  const handleIsPrivateChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const Submit = (data) => {
    // TODO: 実際のAPIを叩く時にidの情報は不要なので削除
    const roomData = {
      id: rooms.length + 1,
      name: data.name,
      youtube_id: data.youtube_id,
      is_private: isPrivate,
      start_time: selectedDate,
    };

    dispatch(createRoom(token, roomData));
    dispatch(getRooms(token));
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        ルーム作成
      </Button>
      <Dialog
        open={createRoomProps.is_opened}
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
      >
        <DialogTitle>ルームを作成する</DialogTitle>
        <form onSubmit={handleSubmit(Submit)}>
          <DialogContent>
            <TextField
              name="name"
              label="ルーム名"
              inputRef={register}
            />
            <TextField
              name="youtube_id"
              label="youtube url"
              inputRef={register}
            />
            <Switch
              checked={isPrivate}
              onChange={handleIsPrivateChange}
              name="isPrivate"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="開始時間"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>中止</Button>
            <Button type="submit">
              作成
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateRoomDialog;
