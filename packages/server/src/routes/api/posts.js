const express = require("express");
const router = express.Router();

// Relative Router --> /api/posts/

// @route   GET api/posts/test
// @desc    Tests the posts route
// @access  Public Route
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

module.exports = router;
