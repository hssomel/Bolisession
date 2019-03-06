// Load Mongoose Models
const Conversation = require("../models/Conversation");
const Credential = require("../models/Credential");

module.exports = server => {
  const io = require("socket.io")(server);

  // Object mapping socketIds and User Ids
  const mobileSockets = {};

  io.on("connection", socket => {
    socket.on("newUser", credentials => {
      const { username } = credentials;
      Promise.all([
        // Find Connected User and All Available Users
        Credential.findOne({ username }, "username publicKey"),
        Credential.find({}, "username publicKey")
      ]).then(([user, users]) => {
        mobileSockets[user[0].id] = socket.id;
        socket.emit("userCreated", { user: user[0], users });
        socket.broadcast.emit("newUser", user[0]);
      });
    });

    socket.on("chat", users => {
      Conversation.findOrCreateConversation(
        users.user.id,
        users.receiver.id
      ).then(conversation =>
        socket.emit(
          "priorMessages",
          conversation.messages.sort((a, b) => {
            return a.timestamp - b.timestamp;
          })
        )
      );
    });

    socket.on("message", ({ text, sender, receiver }) => {
      Conversation.createMessage(text, sender, receiver).then(message => {
        socket.emit("incomingMessage", message);
        const receiverSocketId = mobileSockets[receiver.id];
        socket.to(receiverSocketId).emit("incomingMessage", message);
      });
    });
  });
};
