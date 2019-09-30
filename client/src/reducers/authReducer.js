import {
  SET_CLIENT_KEY,
  INITIAL_CLIENT_PROFILE_FIELDS,
  UPDATE_CLIENT_PROFILE,
} from '../actions/actionTypes';

// user refers strictly to the client
// whereas in profileReducer.js 'profile' can refer to another user's profile
const initialState = {
  userkey: null,
  user: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CLIENT_KEY:
      return {
        ...state,
        userkey: payload,
      };

    case INITIAL_CLIENT_PROFILE_FIELDS:
      return {
        ...state,
        user: payload,
      };

    case UPDATE_CLIENT_PROFILE:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
}
