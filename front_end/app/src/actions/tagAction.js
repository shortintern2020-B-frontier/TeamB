import axios from '../settings/axios';

export const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST';
export const getTagsRequest = () => ({
  type: GET_TAGS_REQUEST,
});

export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const getTagsSuccess = (json) => ({
  type: GET_TAGS_SUCCESS,
  tags: json,
  receivedAt: Date.now(),
});

export const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';
export const getTagsFailure = (error) => ({
  type: GET_TAGS_FAILURE,
  error,
});

export const getTags = (token) => (dispatch) => {
  dispatch(getTagsRequest());
  return axios.get('http://localhost:8000/tags', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => dispatch(getTagsSuccess(res.data)))
    .catch((err) => dispatch(getTagsFailure(err)));
};