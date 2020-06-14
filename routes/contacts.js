const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @desc    Get all user contacts
// @route   GET api/contacts
// @access  Private

router.get('/', async (req, res) => {
    res.send('Get all user contacts')
});


// @desc    Add new contact
// @route   POST api/contacts
// @access  Private

router.post('/', async (req, res) => {
    res.send('Add new contact')
});


// @desc    Update contact
// @route   PUT api/contacts/:id
// @access  Private

router.put('/:id', async (req, res) => {
    res.send('Update contact')
});


// @desc    Delete contact
// @route   DELETE api/contacts/:id
// @access  Private

router.delete('/:id', async (req, res) => {
    res.send('Delete contact')
});

module.exports = router;