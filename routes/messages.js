const { Message, validate } = require('../models/message');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const app = express();

//post or create an exam name
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const message = new Message({
        sender: req.body.sender,
        userName: req.body.userName,
        message: req.body.message
    });
    await message.save();
    res.send(message);
});

//get all messages
router.get('/allMessages', async (req, res) => {
    try {
        const messages = await Message.find({}).sort({createdAt: -1}).select({"_id": 0, "__v":0}).limit(30);
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
});



module.exports = router;