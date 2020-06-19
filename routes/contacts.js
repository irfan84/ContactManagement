const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @desc    Get all user contacts
// @route   GET api/contacts
// @access  Private

router.get('/', auth, async (req, res) => {
    try {
        contacts = await Contact.find({ user:req.user.id }).sort({date: -1});
        return res.status(200).json(contacts);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server error');
    }
});


// @desc    Add new contact
// @route   POST api/contacts
// @access  Private

router.post('/', [auth, check('name', 'Name is required').not().isEmpty()], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        };
        const {name, email, phone, type} = req.body;
        try {
            const newContact = new Contact({
                name, email, phone, type, user: req.user.id
            });
            const contact = await newContact.save();
            return res.status(201).json(contact);
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).send('Server error');
        }
});


// @desc    Update contact
// @route   PUT api/contacts/:id
// @access  Private

router.put('/:id', [auth, check('name', 'Name is required').not().isEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    };
    const {name, email, phone, type} = req.body;
    // Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
    try {
        let contact = await Contact.findById(req.params.id)
        if(!contact){
            return res.status(400).json({msg: 'Contact not found'});
        }
    // Make sure user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'});
        }
        contact = await Contact.findOneAndUpdate(req.params.id,
            {$set: contactFields},
            {new: true});
        return res.status(201).json(contact);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server error');
    }

});


// @desc    Delete contact
// @route   DELETE api/contacts/:id
// @access  Private

router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            return res.status(400).json({msg: 'Contact not found'});
        }
        // Make sure user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'});
        }
        await contact.delete();
        return res.status(201).json({msg: 'Contact Deleted'});
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;