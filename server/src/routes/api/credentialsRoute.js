const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

// load validation helper functions
const validateRegister = require('../../validation/validateRegister');
const validateLogin = require('../../validation/validateLogin');

// load Credential model
const Credential = require('../../models/Credential');

// reference this Template for all JSON responses
// {
//   "status": 400
//   "success": false,
//   "errors": [
//     {
//       name: 'ErrorName1',
//       message: 'Error message 1',
//     },
//     {
//       name: 'ErrorName2',
//       message: 'Error message 2',
//     }
//   ],
//   "data": {}
// }

// @route   POST /api/credentials/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const error = new Error(); // to throw errors into catch block
    const username = req.body.username.toLowerCase();
    const usertype = req.body.usertype.toLowerCase();
    const { password, password2 } = req.body;
    // run async actions in parrallel for speed
    const [
      { isValid, errors },
      existingUser,
      hashedPassword,
    ] = await Promise.all([
      validateRegister({ username, usertype, password, password2 }),
      Credential.findOne({ username }),
      bcrypt.hash(password, 10),
    ]).catch(() => {
      error.name = 'ServerError';
      error.message = 'Internal server error';
      error.status = 500;
      throw error;
    });
    // check for any errors, and throw if any
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
    if (existingUser) {
      error.name = 'UsernameError';
      error.message = 'Username already exists';
      error.status = 409;
      throw error;
    }
    // validation passed - store account data
    const newCredential = new Credential({
      username,
      usertype,
      password: hashedPassword,
    });
    const newCredentialDocument = await newCredential.save().catch(async () => {
      await Credential.findOneAndDelete({ username }); // save() error, so delete incase it saved
      error.name = 'DatabaseError';
      error.message = 'Error while communicating with database';
      error.status = 502;
      throw error;
    });
    const jsonRes = {
      status: 200,
      success: true,
      errors: [],
      data: {
        id: newCredentialDocument.id,
        username: newCredentialDocument.username,
        usertype: newCredentialDocument.usertype,
      },
    };
    res.status(jsonRes.status).json(jsonRes);
  } catch (error) {
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
router.post('/login', async (req, res) => {
  try {
    const error = new Error(); // to throw errors into catch block
    const username = req.body.username.toLowerCase();
    const { password } = req.body;
    // run async actions in parrallel for speed
    const [{ isValid, errors }, userCredential] = await Promise.all([
      validateLogin({ username, password }),
      Credential.findOne({ username }),
    ]).catch(() => {
      error.name = 'ServerError';
      error.message = 'Internal server error';
      error.status = 500;
      throw error;
    });
    // check for any errors, and throw if any
    if (!isValid) {
      const jsonRes = {
        status: 400,
        success: false,
        errors, // from validateLogin();
        data: {},
      };
      res.status(jsonRes.status).json(jsonRes);
      return;
    }
    if (!userCredential) {
      error.name = 'UsernameError';
      error.message = 'Username not found';
      error.status = 404;
      throw error;
    }
    // prepare jwt payload
    const jtwPaylod = {
      id: userCredential.id,
      username: userCredential.username,
      usertype: userCredential.usertype,
    };
    // confirm password & generate token
    const [passwordValid, token] = await Promise.all([
      bcrypt.compare(password, userCredential.password),
      jwt.sign(jtwPaylod, keys.secretOrKey, { expiresIn: 3600 }),
    ]).catch(() => {
      error.name = 'ServerError';
      error.message = 'Internal server error';
      error.status = 500;
      throw error;
    });
    if (!passwordValid) {
      error.name = 'PasswordError';
      error.message = 'Invalid password';
      error.status = 401;
      throw error;
    }
    const jsonRes = {
      status: 200,
      success: true,
      errors: [],
      data: {
        token: `Bearer ${token}`,
      },
    };
    res.status(jsonRes.status).json(jsonRes);
  } catch (error) {
    const jsonRes = {
      status: error.status,
      success: false,
      errors: [{ name: error.name, message: error.message }],
      data: {},
    };
    res.status(jsonRes.status).json(jsonRes);
  }
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
