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
        explanation: req.body.explanation,
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
//get all questions count by subject
router.get('/allQuestionsCountBySubject', async (req, res) => {
    try {
        const exams = await Question.find(req.query).countDocuments();
        return res.status(200).json(exams);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
});
//get questions by subject
router.get('/allQuestions/subject', async (req, res) => {
    var perPage = 10
  var page = req.query.page
    try {
        const questions = await Question.find({"subject": req.query.subject}).skip((perPage * page) - perPage).limit(perPage).sort({createdAt: -1});
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({"error":error});
    }
});
//get questions by bcsName
router.get('/allQuestions/bcsName', async (req, res) => {
    var perPage = 10
  var page = req.query.page
    try {
        const questions = await Question.find({"bcsName": req.query.bcsName}).skip((perPage * page) - perPage).limit(perPage).sort({createdAt: -1});
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