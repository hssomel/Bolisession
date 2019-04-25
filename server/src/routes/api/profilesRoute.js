const express = require('express');
const router = express.Router();

// Relative Router --> /api/profiles/

// @route   GET api/profiles/test
// @desc    Tests the profiles route
// @access  Public Route
router.get('/test', (req, res) => res.json({ msg: 'profiles works' }));

module.exports = router;
