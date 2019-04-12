import axios from "axios";
import { SET_CURRENT_USER, GET_USERS, GET_ERRORS } from "./actionTypes";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  storeData,
  readData,
  removeData
} from "../utils/asyncStorageFunctions";

/////// Assign API_ENDPOINT using one of these:
//import { API_ENDPOINT } from "../../env";
const API_ENDPOINT = "http://192.168.0.14:8080";
// const API_ENDPOINT = "https://social-network-backend-server.herokuapp.com";

let navigate;

// The key for the key-value pair of the jwtToken in local storage
const jwtLocalStorageKey = "jwtToken";

export const registerUser = (newUser, navigation) => dispatch => {
  navigate = navigation.navigate;
  axios
    .post(`${API_ENDPOINT}/api/credentials/register`, newUser)
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
    .post(`${API_ENDPOINT}/api/credentials/login`, userData)
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
      const decoded = jwt_decode(token);
      // Set current user
      console.log("right before dispatch");
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
      console.log(err)
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  console.log("setCurrentUser called");
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const testPress = navigation => dispatch => {
  navigate = navigation.navigate;
  axios
    .get(`${API_ENDPOINT}/api/credentials/allusers`)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
      navigate("Users");
    })
    .catch(err => console.log(JSON.stringify(err)));
};
