const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Subdocument Schema for Messages inside Conversation
const messageSchema = new Schema({
  user: {
    _id: {
      // User who sent message
      type: Schema.Types.ObjectId,
      ref: "Credential"
    },
    username: {
      type: String,
      required: true
    }
  },
  timestamp: {
    // timestamp message was sent
    type: Date,
    default: Date.now
  },
  text: {
    // Message Text
    type: String,
    required: true
  }
});

// Create Conversation Schema
const conversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "Credential" }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  messages: [messageSchema]
});

// Static Methods on the Model - Note Avoid Arrow Functions where access to 'this' is needed
conversationSchema.statics.findOrCreateConversation = function(
  user1Id,
  user2Id
) {
  return this.findOne({ participants: { $all: [user1Id, user2Id] } }, function(
    err,
    conversation
  ) {
    if (err) {
      console.log(err);
      throw err;
    }

    if (conversation) {
      return conversation;
    } else {
      const newConversation = new this({
        participants: [user1Id, user2Id],
        dateCreated: Date.now,
        messages: []
      });

      // newConversation
      //   .save()
      //   .then(dbEntry => {
      //     console.log(dbEntry);
      //   })
      //   .catch(err => console.log(err));

      return newConversation;
    }
  });
};
conversationSchema.statics.createMessage = function(text, sender, receiver) {
  const user1Id = sender.id;
  const user2Id = receiver.id;

  this.findOrCreateConversation(user1Id, user2Id).then(function(conversation) {
    conversation.messages.push({
      user: {
        _id: sender.id,
        username: sender.username
      },
      timestamp: Date.now,
      text
    });

    conversation
      .save()
      .then(dbEntry => {
        console.log(dbEntry);
      })
      .catch(err => console.log(err));
  });
};

// Export Conversation Model
module.exports = mongoose.model("Conversation", conversationSchema);
