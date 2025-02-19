const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    description: String,
    examName: String,
    bcsName: String,
    subject: String,
    explanation: String,
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
},
{
    timestamps: true
}
);
const Question = mongoose.model('Question', questionSchema);

exports.Question = Question;