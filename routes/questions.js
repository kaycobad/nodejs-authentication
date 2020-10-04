const { Question } = require('../models/question');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//post or create an question
router.post('/', async (req, res) => {
    const question = new Question({
        description: req.body.description,
        examName: req.body.examName,
        bcsName: req.body.bcsName,
        subject: req.body.subject,
        alternatives: req.body.alternatives
    });

    await question.save();

    res.send(question);
});


//get all questions
router.get('/allQuestions', async (req, res) => {
    try {
        const questions = await Question.find();
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
});
//get questions by subject
router.get('/allQuestions/subject', async (req, res) => {
    try {
        const questions = await Question.find(req.query);
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
});
//get questions by examName
router.get('/allQuestions/examName', async (req, res) => {
    try {
        const questions = await Question.find(req.query);
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
});

module.exports = router;