import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getTags, postTag, getUserTags } from '../../actions/tagAction';

const tokenSelector = (state) => state.auth.token;
const userIDSelector = (state) => state.auth.id;
const tagsSelector = (state) => state.userTags;

export const TagList = (tags) => {
  if (tags.isFetching) {
    return (
      <p>loading</p>
    );
  }
  return (
    <ul>
      {
        tags.tags.map((tag, index) => (
          <li key={index.toString()}>
            <p>
              { index }
              番目:
              {' '}
              { tag.name }
            </p>
          </li>
        ))
      }
    </ul>
  );
};

const Tags = () => {
  const token = useSelector(tokenSelector);
  const id = useSelector(userIDSelector);
  const tags = useSelector(tagsSelector);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getTags(token));
    dispatch(getUserTags(token, id));
  }, []);

  const Submit = (data) => {
    dispatch(postTag(token, JSON.stringify({ tag: data })));
  };

  return (
    <div>
      <p>tag page</p>
      <TagList {...tags} />
      <form onSubmit={handleSubmit(Submit)}>
        <div>
          <TextField
            name="name"
            label="タグ名"
            inputRef={register}
            variant="filled"
          />
        </div>
        <div>
          <Button type="submit">
            登録
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tags;
