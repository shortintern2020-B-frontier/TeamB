/*
* YuyaMiyata
*/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getTags, postTag, getUserTags } from '../../actions/tagAction';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles ((theme)=>({
  root:{
    flexGrow: 1,
  },
  paper:{
    margin:'auto',
    padding:20,
    width:600,
  },
  panel:{
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  tagPanel:{
    backgroundColor: '#f3f3f3',
  },
  tag:{
    display: 'inline-block',
    color: 'white',
    backgroundColor: '#F03636',
    maxHeight:30,
    flex: 1,
    flexDirection: 'row',
    margin:5,
    padding:3,
    textAlign: 'center',
  },
  button: {
    color: 'white',
    backgroundColor: '#3636F0',
    marinLeft:20,
  },
}));

const tokenSelector = (state) => state.auth.token;
const userIDSelector = (state) => state.auth.id;
const tagsSelector = (state) => state.userTags;

export const TagList = (tags) => {
  const classes = useStyles()
  if (tags.isFetching) {
    return (
      <p>loading</p>
    );
  }
  return (
    <div>
      {
        tags.tags.map((tag, index) => (
          <Paper className={classes.tag}>
          <div key={index.toString()} >
            <div>
              {'# '}
              { tag.name }
            </div>
          </div>
          </Paper>
        ))
      }
    </div>
  );
};

const Tags = () => {
  const classes = useStyles()
  const token = useSelector(tokenSelector);
  const id = useSelector(userIDSelector);
  const tags = useSelector(tagsSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if( params.get("new") !== null ) {
      setIsNewUser(true);
    };
    dispatch(getTags(token));
    dispatch(getUserTags(token, id));
  }, []);

  const Submit = (data) => {
    dispatch(postTag(token, JSON.stringify({ tag: data }), id));
  };

  return (
    <div>
      <h2>タグの管理</h2>
      {(() => {
        if( isNewUser ) {
          return (
            <div>
              <p>ユーザー登録していただきありがとうございます</p>
            </div>
          )
        }
      })()}
      <Grid container className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <Grid item>
          <form onSubmit={handleSubmit(Submit)}>
            <div className={classes.panel}>
              <TextField
                name="name"
                label="タグ名"
                inputRef={register}
                variant="filled"
              />
            </div>
            <div className={classes.panel}>
              <Button type="submit" className={classes.button}>
                登録
              </Button>
            </div>
          </form>
          <Paper elevation={0} variant="outlined" className={classes.tagPanel}>
            <TagList {...tags} />
          </Paper>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default Tags;
