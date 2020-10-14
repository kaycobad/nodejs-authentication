const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    message: {type: String, required: true, minlength: 1, maxlength: 255},
    createdAt: {type: Date, default: Date.now}
});
const Message = mongoose.model('Message', messageSchema);

function validateMessage(message) {
    const schema = Joi.object({
        sender: Joi.objectId(),
        userName: Joi.string().min(2).max(100).required(),
        message: Joi.string().min(1).max(255).required()
    });

    return schema.validate(message);
}

exports.Message = Message;
exports.validate = validateMessage;