const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CredentialSchema = new Schema({
  // userID
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  usertype: {
    // gabroo, mutiyaar, dancer, team, or competition Account
    type: "String",
    required: true
  },
  date: {
    // Date they joined
    type: Date,
    default: Date.now
  }
});

module.exports = Credential = mongoose.model("Credential", CredentialSchema);
