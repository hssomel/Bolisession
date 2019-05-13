import {
  SET_CURRENT_PHONE_NUMBER,
  SET_CURRENT_USER,
  SIGN_OUT_USER,
  SET_CONFIRM_RESULT,
} from '../actions/actionTypes';

const initialState = {
  phoneNumber: '+1',
  user: null,
  confirmResult: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        user: null,
      };
    case SET_CONFIRM_RESULT:
      return {
        ...state,
        confirmResult: action.payload,
      };
    default:
      return state;
  }
}
