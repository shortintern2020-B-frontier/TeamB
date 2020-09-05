import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../actions/postAction';
import axios from 'axios';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const mainSelector = (state) => {
  const { length } = state.posts;
  return state.posts[length - 1];
};

export const check = () => {
  axios.get('http://localhost:5000/api/v1/hello#show')
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
}

export const PostList = (posts) => {
  useEffect(() => {
    check();
  },[])
  if (posts.isFetching) {
    return (
      <p>loading</p>
    );
  }
  return (
    <ul>
      {
        posts.items.map((post, index) => (
          <li key={index.toString()}>
            <p>
              { index }
              番目:
              {' '}
              { post.title }
            </p>
          </li>
        ))
      }
    </ul>
  );
};

export const Main = () => {
  const posts = useSelector(mainSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div>
      <PostList {...posts} />
    </div>
  );
};
