const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    info: {
      type: String,
    },
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        type: String,
      },
    ],
    answerInfo: {
      types: [{ type: String, required: true }],
      points: [{ type: Number }],
      validation: {
        max: {
          type: Number,
        },
      },
      label: {
        type: String,
      },
    },
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
