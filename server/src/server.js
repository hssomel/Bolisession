require("dotenv").config(); // sets environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const ip = require("ip");
const fs = require("fs");

// Import API route files
const credentials = require("./routes/api/credentials");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

// Initialize express
const app = express();

// API URL
const address = ip.address();
const port = process.env.PORT || 8080;
const url = `http://${address}:${port}`;

// Test Response at API root route; Log any errors
app.get("/", (req, res) => {
  console.log(typeof(req.ip));
  console.log(`API request at "${req.path}" from ${req.protocol}://${req.ip}`);
  res.json({msg: `API connected at ${url}`});
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(error => console.log(error));

// Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/credentials", credentials);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// Run Server on that Port
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API: ${url}`);
});

// Write a env.js file in the client directory to configure API_BASE_URL
const data = `export const API_BASE_URL = "http://${ip.address()}:${port}";`;
fs.writeFile('../client/env.js', data, err => {
  if (err) console.log("Error while writing client env.js file", err);
  else console.log("Generated Client-side env.js configuration!")
})

// Initialize socket.io
require("./sockets/socketServer")(server);