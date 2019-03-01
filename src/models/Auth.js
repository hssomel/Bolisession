const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CredentialSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  usertype: {
    // Dancer, Team, or Competition Account
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
