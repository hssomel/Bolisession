const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Conversation Schema
const ConversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "Credential" }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  messages: [
    {
      user: {
        // User who sent message
        type: Schema.Types.ObjectId,
        ref: "Credential"
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
    }
  ]
});

Conversation = mongoose.model("Conversation", ConversationSchema);

// Static methods on the schema
ConversationSchema.statics.findOrCreateConversation = userIDArray => {
  Conversation.find(
    { participants: { $all: userIDArray } },
    (err, conversation) => {
      if (err) {
        throw err;
      }
      if (conversation) {
        return conversation;
      }

      // Create a new conversation if none exists
      Conversation.create(
        {
          participants: userIDArray,
          dateCreated: Date.now,
          messages: []
        },
        (err, conversation) => {
          return conversation;
        }
      );
    }
  );
};

// Instance methods on the schema

module.exports = Conversation;
