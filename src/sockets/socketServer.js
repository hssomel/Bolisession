// Load Mongoose Models
const Conversation = require("../models/Conversation");
const Credential = require("../models/Credential");

module.exports = server => {
  const io = require("socket.io")(server);

  // Object mapping socketIds and User Ids
  const mobileSockets = {};

  io.on("connection", socket => {
    console.log(`connected to user on socket id: ${socket.id}`);
    socket.on("newUser", credentials => {
      console.log(credentials);
      const { username } = credentials;
      Promise.all([
        // Find Connected User and All Available Users
        Credential.findOne({ username }, "username publicKey"),
        Credential.find({}, "username publicKey")
      ]).then(([user, users]) => {
        //

        // TESTING ONLY
        console.log(user);
        console.log(users);
        //
        //
        //
        mobileSockets[user._id] = socket.id;
        console.log(mobileSockets);
        socket.emit("userCreated", { user: user, users });
        socket.broadcast.emit("newUser", user);
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
