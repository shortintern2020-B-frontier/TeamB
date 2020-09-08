import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTags } from '../../actions/tagAction';

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

  useEffect(() => {
    dispatch(getTags(token));
  }, [])

  return (
    <div>
      <p>tag page</p>
      <TagList {...tags} />
    </div>
  )
}

export default Tags;