// Load Mongoose Models
const socketIo = require('socket.io');
const Conversation = require('../models/Conversation');
const Credential = require('../models/Credential');

module.exports = server => {
  const io = socketIo(server);

  // Object mapping socketIds and User Ids
  const mobileSockets = {};

  io.on('connection', socket => {
    console.log(`connected to user on socket id: ${socket.id}`);

    socket.on('newUser', userID => {
      mobileSockets[userID] = socket.id;
      console.log('New user added to mobileSockets Object', mobileSockets);
    });
  });
};
