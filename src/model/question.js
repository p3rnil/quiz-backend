const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        type: String,
        required: true,
      },
    ],
    dependencyQuestion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question',
    },
    dependencyAnswer: {
      type: String,
    },
  },
  { timestamps: true }
)

const Question = mongoose.model('question', questionSchema)

module.exports = Question
