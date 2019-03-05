const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
// const ConversationSchema = new Schema({
//   userIds: {
//   },
//   messages: {
//     {user:
//     mesage:
//   time:}
//   },
//   usertype: {
//     // gabroo, mutiyaar, dancer, team, or competition Account
//     type: "String",
//     required: true
//   },
//   date: {
//     // Date they joined
//     type: Date,
//     default: Date.now
//   }
// });

module.exports = Conversation = mongoose.model(
  "Conversation",
  ConversationSchema
);
