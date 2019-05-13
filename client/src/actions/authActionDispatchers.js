import { SET_CURRENT_PHONE_NUMBER } from './actionTypes';
import { SET_CURRENT_USER } from './actionTypes';
import { SIGN_OUT_USER } from './actionTypes';
import { SET_CONFIRM_RESULT } from './actionTypes';

// Set logged in user
export const capturePhoneNum = phoneNumber => dispatch => {
  dispatch({
    type: SET_CURRENT_PHONE_NUMBER,
    payload: phoneNumber,
  });
};

export const captureConfirmResult = ConfirmResult => dispatch => {
  dispatch({
    type: SET_CONFIRM_RESULT,
    payload: ConfirmResult,
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
