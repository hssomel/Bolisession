const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

// Load Validation
const validateRegister = require('../../validation/validateRegister');
const validateLogin = require('../../validation/validateLogin');

// Load Credential model
const Credential = require('../../models/Credential');

// Reference this Template for all JSON responses
// const newResponse =
//   status: 400
//   success: false,
//   errors: [
//     {
//       name: 'ErrorName1',
//       message: 'Error message 1',
//     },
//     {
//       name: 'ErrorName2',
//       message: 'Error message 2',
//     },
//   ],
//   data: {},
// };

// @route   POST /api/credentials/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    let error = new Error();
    const { username, password, usertype } = req.body;
    // Run async actions in parrallel for speed
    const [{ isValid, errors }, existingUser, hash] = await Promise.all([
      validateRegister(req.body),
      Credential.findOne({ username }),
      bcrypt.hash(password, 10),
    ]).catch(e => {
      console.log(e);
      error.name = 'ServerError';
      error.message = 'Internal server error';
      error.status = 500;
      throw error;
    });
    // Check for any errors, and throw if any
    if (existingUser) {
      error.name = 'UsernameError';
      error.message = 'Username already exists';
      error.status = 409;
      throw error;
    }
    if (!isValid) {
      const jsonRes = {
        status: 400,
        success: false,
        errors, // from validateRegister();
        data: {},
      };
      res.status(jsonRes.status).json(jsonRes);
      return;
    }
    // Validation passed, create newAccount and send data or throw error
    const newAccount = new Credential({ username, usertype, password: hash });
    const { id } = await newAccount.save().catch(e => {
      console.log(e);
      error.name = 'DatabaseError';
      error.message = 'Error while communicating with database';
      error.status = 502;
      throw error;
    });
    const jsonRes = {
      status: 200,
      success: true,
      errors: [],
      data: { id, username, usertype },
    };
  } catch (error) {
    console.log(error);
    const jsonRes = {
      status: error.status,
      success: false,
      errors: [{ name: error.name, message: error.message }],
      data: {},
    };
    res.status(jsonRes.status).json(jsonRes);
  }
});

// @route   POST api/credentials/login
// @desc    Login User (AKA Return JWT)
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  Credential.findOne({ username }).then(user => {
    // In case username doesn't exist
    if (!user) {
      errors.username = 'Username not found';
      return res.status(404).json(errors);
    }

    // Check the Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched - Sign the JWT

        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
          usertype: user.usertype,
        };

        // Sign Token and send it to user
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: 'Bearer ' + token });
          },
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/credentials/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      usertype: req.user.usertype,
    });
  },
);

// @route   GET api/credentials/allusers
// @desc    Return the username, usertype, and _id of all users
// @access  Public
router.get('/allusers', (req, res) => {
  let errors = {};
  Credential.find({}, 'username usertype').then(users => {
    if (!users) {
      errors.users = 'No user was found';
      return res.status(404).json(errors);
    }
    res.json(users);
  });
});

module.exports = router;
