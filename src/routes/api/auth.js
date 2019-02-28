const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load Auth model
const Auth = require("../../models/Auth");

// @route   GET api/auth/test
// @desc    Tests the auth route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "auth works" }));

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  Auth.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      const newAuth = new Auth({
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype
      });

      // Hash the password for database storage
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAuth.password, salt, (err, hash) => {
          if (err) throw err;
          newAuth.password = hash;
          newAuth
            .save()
            .then(registeredUser => res.json(registeredUser))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/auth/login
// @desc    Login User (AKA Return JWT)
// @access  Public
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  Auth.findOne({ username }).then(user => {
    // In case username doesn't exist
    if (!user) {
      return res.status(404).json({ username: "Username not found" });
    }

    // Check the Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        res.json({ msg: "success" });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
