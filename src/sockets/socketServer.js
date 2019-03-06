// Pairing socketIds and User Ids
const mobileSockets = {};

// Load Mongoose Models
const Conversation = require("../models/Conversation");

module.exports = server => {
  const io = require("socket.io")(server);

  io.on("connection", socket => {
    console.log("a user connected" + " | socketID: " + socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("chat message", msg => {
      io.emit("chat message", msg);
    });
  });
};
