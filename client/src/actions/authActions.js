import axios from "axios";
import { SET_CURRENT_USER, GET_USERS, GET_ERRORS } from "./actionTypes";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

let navigate;

export const registerUser = (newUser, navigation) => dispatch => {
  navigate = navigation.navigate;
  axios
    .post(
      // "https://social-network-backend-server.herokuapp.com/api/credentials/register",
      "http://192.168.42.188:8080/api/credentials/register",
      newUser
    )
    .then(() => {
      navigate("Next");
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
    .post(
      // "https://social-network-backend-server.herokuapp.com/api/credentials/login",
      "http://192.168.42.188:8080/api/credentials/login",
      userData
    )
    .then(res => {
      console.log(JSON.stringify(res.data));
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
      console.log(JSON.stringify(err))
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const testPress = navigation => dispatch => {
  navigate = navigation.navigate;
  axios
    .get(
      "https://social-network-backend-server.herokuapp.com/api/credentials/allusers"
    )
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
      navigate("Users");
    })
    .catch(err => console.log(JSON.stringify(err)));
};
