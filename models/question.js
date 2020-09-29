const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    description: String,
    examName: String,
    subject: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
});
const Question = mongoose.model('Question', questionSchema);

exports.Question = Question;