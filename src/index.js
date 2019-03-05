require("dotenv").config(); // sets environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

// Import API route files
const credentials = require("./routes/api/credentials");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

// Initial express
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(error => console.log(error));

// Dummy Hello World Route at Root
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/html/index.html");
});

// Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/credentials", credentials);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// Port
const port = process.env.PORT || 8080;

// Run Server on that Port
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

// Initialize socket.io
const io = require("socket.io")(server);
io.on("connection", socket => {
  console.log("a user connected" + " | socketID: " + socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});
