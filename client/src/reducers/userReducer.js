import { USER_LOADING, USER_LOADED, USER_ERROR } from '../actions/types';

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
        isLoading: null
      };
    default:
      return state;
  }
}
