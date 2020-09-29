const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//log in an user
router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Ivalid password or email.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Ivalid password or email.');

    const token = user.generateLoginToken();
    res.json({token: token, name: user.name, email: user.email, id: user.id});
});

function validateLogin(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    });

    return schema.validate(req);
}

module.exports = router;