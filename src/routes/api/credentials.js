const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Credential model
const Credential = require("../../models/Credential");

// @route   GET api/credentials/test
// @desc    Tests the credentials route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "credentials works" }));

// @route   POST api/credentials/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  // Run request body through validation first
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation if there are any errors in the errors object
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Credential.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "Username already exists";
      return res.status(400).json(errors);
    } else {
      // Valid new account - hash the password and save into db
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          const newAccount = new Credential({
            username: req.body.username,
            password: hash,
            usertype: req.body.usertype
          });

          newAccount
            .save()
            .then(dbEntry =>
              res.json({
                id: dbEntry.id,
                username: dbEntry.username,
                usertype: dbEntry.usertype
              })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/credentials/login
// @desc    Login User (AKA Return JWT)
// @access  Public
router.post("/login", (req, res) => {
  // Run request body through validation first
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  Credential.findOne({ username }).then(user => {
    // In case username doesn't exist
    if (!user) {
      errors.username = "Username not found";
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
          usertype: user.usertype
        };

        // Sign Token and send it to user
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/credentials/currentuser
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      usertype: req.user.usertype
    });
  }
);

// @route   GET api/credentials/allusers
// @desc    Return the username and id of all users
// @access  Public
router.get("/allusers", (req, res) => {
  let errors = {};
  Credential.find({}, "username usertype").then(users => {
    if (!users) {
      errors.users = "No user was found";
      return res.status(404).json(errors);
    }
    res.json(users);
  });
});

module.exports = router;
