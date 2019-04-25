const { Schema, model } = require('mongoose');

// Create the Post Schema
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'credential',
  },
  email: {
    type: String,
    required: true,
  },
});
