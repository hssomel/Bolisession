import {
  CLEAR_PROFILE_SCREEN,
  SET_PROFILE_ON_PROFILESCREEN,
  SET_PROFILE_KEY,
} from '../actions/actionTypes';

// profile can be of the client or another user
// if the client clicked on someone else's avatar
const initialState = {
  profilekey: null,
  profile: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PROFILE_ON_PROFILESCREEN:
      return {
        ...state,
        profile: payload,
      };

    case SET_PROFILE_KEY:
      return {
        ...state,
        profilekey: payload,
      };

    case CLEAR_PROFILE_SCREEN:
      return {
        ...state,
        profile: null,
        profilekey: null,
      };

    default:
      return state;
  }
}
