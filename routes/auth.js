const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// @desc    Get logged in user
// @route   GET api/auth
// @access  Public

router.get('/', async (req, res) => {
    res.send('Get logged in user')
});


// @desc    Authenticate user & get token
// @route   POST api/auth
// @access  Public

router.post('/', async (req, res) => {
    res.send('Authenticate user & get token')
});

module.exports = router;