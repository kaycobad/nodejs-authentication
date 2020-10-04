const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const completedExamsSchema = new mongoose.Schema({
    exam: String,
    score: Number,
    createdAt: {type: Date, default: Date.now}
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    completedExams: [completedExamsSchema]
});

userSchema.methods.generateLoginToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;