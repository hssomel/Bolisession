/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

 // Set baseURL for Axios (Generated in env.js by server!)
 import { API_BASE_URL } from "./env"; // import from env.js
 import axios from "axios";
 axios.defaults.baseURL = API_BASE_URL;

axios
  .get(`/`)
  .then(res => console.log(res.data))
  .catch(err => {
    console.log("API not Connected!");
    console.log(err);
  });

AppRegistry.registerComponent(appName, () => App);
