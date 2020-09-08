import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getTags, postTag } from '../../actions/tagAction';

const tokenSelector = (state) => state.auth.token;
const tagsSelector = (state) => state.tags;

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
  const tags = useSelector(tagsSelector);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getTags(token));
  }, []);

  const Submit = (data) => {
    data.id = tags.tags.length + 1; // eslint-disable-line no-param-reassign
    dispatch(postTag(token, data));
    dispatch(getTags(token));
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
