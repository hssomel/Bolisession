// This File Acts as a library of Action Dispatching functions

import axios from "axios";
import { SET_CURRENT_USER, GET_USERS, GET_ERRORS } from "./actionTypes";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  storeData,
  readData,
  removeData
} from "../utils/asyncStorageFunctions";
import { connectSocket, newSocketConnection } from "./socketActionDispatchers";

let navigate;

// The key for jwtToken in local storage
const jwtLocalStorageKey = "jwtToken";

export const registerUser = (newUser, navigation) => dispatch => {
  navigate = navigation.navigate;
  axios
    .post(`/api/credentials/register`, newUser)
    .then(() => {
      navigate("Login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post(`/api/credentials/login`, userData)
    .then(res => {
      const { token } = res.data;
      // Set token using AyncStorage to device
      storeData(jwtLocalStorageKey, token).then(success => {
        if (success) {
          console.log("JWT stored on Device!");
        } else {
          console.log("JWT storage Failed!");
        }
      });
      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decodedToken = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decodedToken));

      // Connect Socket - Stateful connection
      dispatch(connectSocket(decodedToken.id));
    })
    .catch(err => {
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
      console.log("console logging catch error");
      console.log(err);
    });
};

// Set logged in user
const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

export const getUsers = navigation => dispatch => {
  navigate = navigation.navigate;
  axios
    .get(`/api/credentials/allusers`)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
      // navigate("Users");
    })
    .catch(err => console.log(JSON.stringify(err)));
};
