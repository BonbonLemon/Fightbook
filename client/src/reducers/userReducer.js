import {
  USER_LOADING,
  USER_LOADED,
  USER_ERROR,
  USERS_LOADED
} from '../actions/types';

const initialState = {
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isLoading: false
      };
    case USER_ERROR:
      return {
        ...state,
        user: null,
        isLoading: false
      };
    case USERS_LOADED:
      return {
        ...state,
        users: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
