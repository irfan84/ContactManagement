const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @desc    Register user
// @route   POST api/users
// @access  Public

router.post('/', async (req, res) => {
    res.send('Register user')
});

module.exports = router;