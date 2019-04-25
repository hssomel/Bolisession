require('dotenv').config(); // sets environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const ip = require('ip');
const fs = require('fs');
const http = require('http');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const keys = require('./config/keys');

// Import API route files
const credentials = require('./routes/api/credentials');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

// Initialize express
const app = express();
const server = http.createServer(app);

// Initialize socket.io
require('./sockets/socketServer')(server);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Using morgan & morgan-body to log during development
app.use(
  morgan(
    '\nINCOMING :method :url  FROM :remote-addr' +
      '\nAuthorization Header: :req[Authorization]',
  ),
);
morganBody(app);

// API URL
const address = ip.address();
const port = process.env.PORT || 8080;
const url = `http://${address}:${port}`;
const requestLogger = require('./utils/requestLogger');

// Test Response at API root route; Log any errors
app.get('/', (req, res) => {
  requestLogger(req, res);
  res.json({ msg: `API connected at ${url}` });
});

// Connect to MongoDB
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(error => console.log(error));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/credentials', credentials);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

// Write a env.js file in the client directory to configure API_BASE_URL
const data = `export const API_BASE_URL = "http://${ip.address()}:${port}";`;
// const data = `export const API_BASE_URL = "http://localhost:${port}";`;
fs.writeFile('../mobile/env.js', data, err => {
  if (err) console.log('Error while writing client env.js file', err);
  else console.log('Generated MOBILE env.js configuration!');
});
fs.writeFile('../web/src/env.js', data, err => {
  if (err) console.log('Error while writing client env.js file', err);
  else console.log('Generated WEB env.js configuration!');
});

// Run Server on that Port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API: ${url}`);
});
