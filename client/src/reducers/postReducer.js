import {
  GET_ALL_POSTS,
  GET_POSTS_BY_PROFILE,
  CLEAR_PROFILE_SCREEN,
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  postsByProfile: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: payload,
      };

    case GET_POSTS_BY_PROFILE:
      return {
        ...state,
        postsByProfile: payload,
      };

    case CLEAR_PROFILE_SCREEN:
      return {
        ...state,
        postsByProfile: null,
      };

    default:
      return state;
  }
}
