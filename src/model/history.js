const mongoose = require('mongoose')

const historySchema = new mongoose.Schema(
  {
    idQuiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'quiz',
    },
    persistent: {
      type: Boolean,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    questions: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'question',
        },
        answer: { type: String },
      },
    ],
  },
  { timestamps: true }
)

const History = mongoose.model('history', historySchema)

module.exports = History
