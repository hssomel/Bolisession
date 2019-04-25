import io from 'socket.io-client';
import axios from 'axios';

// Connect to Socket
export const connectSocket = userId => {
  const socket = io(axios.defaults.baseURL);
  socket.emit('newUser', userId);
};

// export const newSocketConnection = token => dispatch => {

//   return {

//   }
// }
