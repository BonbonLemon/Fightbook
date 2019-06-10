import axios from 'axios';
import { USER_LOADED, USER_LOADING, USER_ERROR } from './types';
import { returnErrors } from './errorActions';

// Check token & load user
export const getUser = userId => dispatch => {
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/users/' + userId)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: USER_ERROR
      });
    });
};
