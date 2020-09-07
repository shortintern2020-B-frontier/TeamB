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

import { openRoomDialog, closeRoomDialog, createRoom } from '../../actions/createRoomAction';

const createRoomSelector = (state) => state.create_room;

export const CreateRoomDialog = () => {
  const create_room = useSelector(createRoomSelector);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  // 動画ルームを非公開にするかどうか
  const [isPrivate, setIsPrivate] = useState(true);

  const handleOpen = () => {
    dispatch(openRoomDialog());
  };

  const handleClose = () => {
    dispatch(closeRoomDialog());
  };

  const handleIsPrivateChange = (event) => {
    setIsPrivate(!isPrivate);
  };

  const Submit = (data) => {
    console.log(data);
    handleClose();
    // dispatch(createRoom(JSON.stringify(data)));
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        ルーム作成
      </Button>
      <Dialog
        open={create_room.is_opened}
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

//export default CreateRoomDialog;
