// Load Mongoose Models
const Conversation = require("../models/Conversation");
const Credential = require("../models/Credential");

module.exports = server => {
  const io = require("socket.io")(server);

  // Object mapping socketIds and User Ids
  const mobileSockets = {};

  io.on("connection", socket => {
    console.log(`connected to user on socket id: ${socket.id}`);
    //socket.on();
  });
};
