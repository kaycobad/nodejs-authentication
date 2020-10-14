const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    title: {type: String, required: true},
    subTitle: {type: String, required: true},
    marks: String,
    createdAt: {type: Date, default: Date.now}
});
const Exam = mongoose.model('Exam', examSchema);

exports.Exam = Exam;