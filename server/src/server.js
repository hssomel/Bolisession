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
const credentialsRoute = require('./routes/api/credentialsRoute');
const profilesRoute = require('./routes/api/profilesRoute');
const postsRoute = require('./routes/api/postsRoute');

// Initialize express
const app = express();
const server = http.createServer(app);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Using morgan & morgan-body to log during development
app.use(
  morgan(
    '\nINCOMING REQUEST:method :url  FROM :remote-addr' +
      '\nAuthorization Header: :req[Authorization]',
  ),
);
morganBody(app);

// API URL
const address = ip.address();
const port = process.env.PORT || 8080;
const url = `http://${address}:${port}`;

// Test Response at API root route; Log any errors
app.get('/', (req, res) => {
  res.json({ msg: `API connected at ${url}` });
});

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(error => console.log(error));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/credentials', credentialsRoute);
app.use('/api/profiles', profilesRoute);
app.use('/api/posts', postsRoute);

// generate env.js files
const data = `
export const API_BASE_URL = "http://${ip.address()}:${port}"; 
export const MAPBOX_TOKEN = "${process.env.MAPBOX_TOKEN}"
`;
fs.writeFile('../mobile/env.js', data, err => {
  if (err) console.log('Error while writing ../mobile/env.js', err);
  else console.log('Generated ../mobile/env.js');
});
fs.writeFile('../client/env.js', data, err => {
  if (err) console.log('Error while writing ../client/env.js', err);
  else console.log('Generated ../client/env.js');
});
fs.writeFile('../MASTER/env.js', data, err => {
  if (err) console.log('Error while writing ../MASTER/env.js', err);
  else console.log('Generated ../MASTER/env.js');
});

// generate GoogleService-Info.plist for IOS
fs.writeFile(
  '../client/ios/GoogleService-Info.plist',
  process.env.GOOGLE_SERVICE_INFO_PLIST,
  err => {
    if (err)
      console.log(
        'Error while writing ../client/ios/GoogleService-Info.plist',
        err,
      );
    else console.log('Generated ../client/ios/GoogleService-Info.plist');
  },
);
// generate GoogleService-Info.plist for MASTER
fs.writeFile(
  '../MASTER/ios/GoogleService-Info.plist',
  process.env.GOOGLE_SERVICE_INFO_PLIST,
  err => {
    if (err)
      console.log(
        'Error while writing ../MASTER/ios/GoogleService-Info.plist',
        err,
      );
    else console.log('Generated ../MASTER/ios/GoogleService-Info.plist');
  },
);

// generate google-services.json for android
fs.writeFile(
  '../client/android/app/google-services.json',
  process.env.GOOGLE_SERVICES_JSON,
  err => {
    if (err)
      console.log(
        'Error while writing ../client/android/app/google-services.json',
        err,
      );
    else console.log('Generated ../client/android/app/google-services.json');
  },
);
// generate google-services.json for android mapbox-version
fs.writeFile(
  '../MASTER/android/app/google-services.json',
  process.env.GOOGLE_SERVICES_JSON,
  err => {
    if (err)
      console.log(
        'Error while writing ../MASTER/android/app/google-services.json',
        err,
      );
    else console.log('Generated ../MASTER/android/app/google-services.json');
  },
);

// Initialize socket.io
require('./sockets/socketServer')(server);

// Run Server on that Port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API: ${url}`);
});
