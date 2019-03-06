const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const credentialSchema = new Schema({
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

// Export Credential Model
module.exports = mongoose.model("Credential", credentialSchema);
