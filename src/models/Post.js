// Post Model File
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Post Schema
const ProfileSchema = new Schema({
  type: Schema.Types.ObjectId,
  ref: "Credential"
});
