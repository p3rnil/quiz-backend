const models = require('../model')

const getToken = (_, res) => {
  res.send('sfsdfsdefdsf')
}

// TODO: Hacer el historial
const getQuiz = async (req, res) => {
  const foundQuiz = await models.Quiz.findOne({
    name: req.params.name,
    'question.0': { $exists: true },
  })

  try {
    // Get first question
    if (foundQuiz) {
      const quizPopulated = await foundQuiz
        .populate('question.0')
        .execPopulate()
      const result = quizPopulated.question[0]

      // Create quiz history
      const history = {}

      // Save history to db

      res.send(result)
    } else {
      res.status(404).send('This quiz has not associated questions.')
    }
  } catch (error) {
    res.send('Specified question id does not exists.')
  }
}

// TODO: Hacer el historial
const getNextQuestion = async (req, res) => {
  const { id, answer, context } = req.params

  const { question: questionArray } = await models.Quiz.findOne({
    name: context.quizName,
  })
    .populate('question')
    .lean()
    .exec()

  let index = questionArray.findIndex((x) => x._id == id)
  const currentQuestion = questionArray[index]
  let found = false
  let result = null

  // Get next question
  while (!found && index < questionArray.length) {
    if (!questionArray[index + 1].dependencyQuestion) {
      found = true
      result = questionArray[index + 1]
    } else {
      if (
        questionArray[index + 1].dependencyQuestion.equals(
          currentQuestion._id
        ) &&
        questionArray[index + 1].dependencyAnswer == answer
      ) {
        found = true
        result = questionArray[index + 1]
      }
    }
    index++
  }

  result = await models.Question.findById(result._id)

  res.send(result)
}

const completeQuiz = (req, res) => {
  res.send('Quiz completado!')
}

module.exports = { getToken, getQuiz, getNextQuestion, completeQuiz }
