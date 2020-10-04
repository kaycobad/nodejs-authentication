const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');
const users = require('./routes/users');
const login = require('./routes/login');
const questions = require('./routes/questions');
const exams = require('./routes/exams');
const express = require('express');
const app = express();


if(!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey not defined.");
    process.exit(1);
}
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/questions', questions);
app.use('/api/exams', exams);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));