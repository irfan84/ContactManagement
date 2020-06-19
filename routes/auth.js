const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
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

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;

    try{
        // Check if user exists
        let user = await User.findOne({ email });
        if(!user){
            res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if(err)
                    throw err;
                res.json({ token })
            });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;