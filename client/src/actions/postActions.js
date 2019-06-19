import axios from 'axios';
import { RECEIVE_POST, RECEIVE_POSTS } from './types';
import { tokenConfig } from './authActions';

export const createPost = ({ postedBy, postedTo, body }) => (
  dispatch,
  getState
) => {
  // Request body
  const reqBody = JSON.stringify({
    postedBy,
    postedTo,
    body
  });

  axios
    .post('/api/posts', reqBody, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: RECEIVE_POST,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const getPosts = userId => dispatch => {
  axios
    .get(`/api/posts/${userId}`)
    .then(res =>
      dispatch({
        type: RECEIVE_POSTS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log('Get posts error');
    });
};
