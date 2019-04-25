const { Schema, model } = require('mongoose');

// Create Schema
const credentialSchema = new Schema({
  // userID
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    // gabroo, mutiyaar, dancer, team, or competition Account
    type: String,
    required: true,
  },
  date: {
    // Date they joined
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Export Credential Model
module.exports = model('Credential', credentialSchema);
