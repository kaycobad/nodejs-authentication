const { Exam } = require('../models/exam');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//post or create an exam name
router.post('/', async (req, res) => {
    const exam = new Exam({
        title: req.body.title,
        subTitle: req.body.subTitle
    });

    await exam.save();

    res.send(exam);
});


//get all exam names
router.get('/allExams', async (req, res) => {
    try {
        const exams = await Exam.find({}).sort({createdAt: -1}).select({title: 1, subTitle: 1, _id: 0});
        return res.status(200).json(exams);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
});


module.exports = router;