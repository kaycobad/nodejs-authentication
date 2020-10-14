const authorization = require('../middleware/authorization');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//get logged in user information
router.get('/me', authorization, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
//get all users list
router.get('/usersList', async function(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
} catch (error) {
    return res.status(500).json({"error":error});
}
});

//register a new user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateLoginToken();
    //res.header('x-login-token', token).send(_.pick(user, ['name', 'email']));
    res.json({token: token, name: user.name, email: user.email, id: user.id});
});

//add user completed exam and score
router.post('/addCompletedExams', async (req, res) => {
  var conditions = {
    _id: req.body.id,
    'completedExams.exam': { $ne: req.body.exam }
  };

  var update = {
      $addToSet: { completedExams: { exam: req.body.exam, score: req.body.score } } 
  };

  await User.findOneAndUpdate(conditions, update, function(err, doc) {
 
  });
  
  res.send('success');
});

//update score for existed exam
router.post('/updateScore', async (req, res) => {
  
    await User.findOneAndUpdate({ _id: req.body.id, 'completedExams._id': req.body.examId },{ 
      "$set": {
          "completedExams.$.score": req.body.score
      }
  }, function(err, result){

      if(err){
          res.send(err);
      }
      else{
          res.send('success');
      }

  });
  });
// get user completed all exams
router.get('/completedExams', async function(req, res) {
  try {
    const id = req.query._id;
    const completedExam = await User.aggregate([
      {$match: {"_id": mongoose.Types.ObjectId(id)}},
      {$unwind: "$completedExams"},
      {$sort: {"completedExams.createdAt": -1}},
      {$project:{"completedExams.createdAt": 1, "completedExams.exam": 1, "completedExams.score": 1, "_id": 0}}
  ]);
    return res.status(200).json(completedExam);
} catch (error) {
    return res.status(500).json({"error":error});
}
});
//get examId
router.get('/examId', async function(req, res) {
  try {
    const examId = await User.find(req.query, { 'completedExams.$': 1 },  function(err, foundUsers){
      
   });
    return res.status(200).json(examId);
} catch (error) {
    return res.status(500).json({"error":error});
}

});

//get all user scores for a particular exam
router.get('/examScores', async function(req, res) {

const allScores = User.find(req.query).sort({'completedExams.score': -1, 'completedExams.createdAt': -1}).select({'completedExams.$': 1, name: 1}).limit(5).exec(
  function(err, allScores) {
    if (err) res.status(500).send(err);
    res.json(allScores);
  });

});

module.exports = router;