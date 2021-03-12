const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    name: {
      type: String,
    },
    question: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
      },
    ],
  },
  { timestamps: true }
)

const Quiz = mongoose.model('quiz', quizSchema)

module.exports = Quiz
