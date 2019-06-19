import { RECEIVE_POST, RECEIVE_POSTS } from '../actions/types';

const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
}
