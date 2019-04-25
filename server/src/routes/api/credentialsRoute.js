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

// @route   POST /api/credentials/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  Promise.all([
    validateRegister(req.body),
    Credential.findOne({ username: req.body.username }),
    bcrypt.genSalt(10),
  ])
    .then(([validation, existingUser, salt]) => {
      const { errors, isValid } = validation;
      if (!isValid) {
        res.status(400).json({ success: false, errors, data: {} });
        return;
      }
      if (existingUser) {
        errors.push({
          type: 'username',
          message: 'Username already exists',
        });
        res.status(400).json({ success: false, errors, data: {} });
        return;
      }
      bcrypt
        .hash(req.body.password, salt)
        .then(hash => {
          const newAccount = new Credential({
            username: req.body.username,
            password: hash,
            usertype: req.body.usertype,
          });
          newAccount
            .save()
            .then(savedAccount => {
              res.json({
                success: true,
                errors: [],
                data: {
                  id: savedAccount.id,
                  username: savedAccount.username,
                  usertype: savedAccount.usertype,
                },
              });
            })
            .catch(error => {
              res.status(500).json({
                success: false,
                errors: [
                  { type: 'internal', message: 'Internal server error' },
                ],
                data: {},
              });
              console.log(error);
            });
        })
        .catch(error => {
          res.status(500).json({
            success: false,
            errors: [{ type: 'internal', message: 'Internal server error' }],
            data: {},
          });
          console.log(error);
        });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        errors: [{ type: 'internal', message: 'Internal server error' }],
        data: {},
      });
      console.log(error);
    });
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
