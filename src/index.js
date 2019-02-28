require("dotenv").config(); // sets environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const auth = require("./routes/api/auth");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(error => console.log(error));

// Main Route
app.get("/", (req, res) => res.send("Hel5654654lo"));

// Use Routes
app.use("/api/auth", auth);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// Port
const port = process.env.PORT || 8080;

// Run Server on that Port
app.listen(port, () => console.log(`Server running on port ${port}`));
