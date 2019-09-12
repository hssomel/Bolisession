// **** FULL REDUX INTEGRATION NOT CURRENTLY IMPLEMENTED ***
// **** THIS CODE IS A STARTING POINT ****
import { SET_CURRENT_PHONE_NUMBER } from './actionTypes';
import { SET_CURRENT_USER } from './actionTypes';
import { SIGN_OUT_USER } from './actionTypes';

// Set logged in user
export const capturePhoneNum = phoneNumber => dispatch => {
  dispatch({
    type: SET_CURRENT_PHONE_NUMBER,
    payload: phoneNumber,
  });
};

export const captureUser = user => dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};

export const signOutUser = () => dispatch => {
  dispatch({
    type: SIGN_OUT_USER,
    // payload: user,
  });
};
