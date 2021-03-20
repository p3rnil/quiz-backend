const jwt = require('jsonwebtoken')
const models = require('../model')

const getToken = (_, res) => {
  const token = jwt.sign({}, process.env.SECRET)
  res.send(token)
}

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
      const history = {
        idQuiz: quizPopulated._id,
        persistent: false,
        token: req.headers.authorization,
        questions: [],
      }

      // Save history to db
      await models.History.create(history)

      res.send(result)
    } else {
      res.status(404).send('This quiz has not associated questions.')
    }
  } catch (error) {
    res.status(500).send('Specified question id does not exists.')
  }
}

const getNextQuestion = async (req, res) => {
  const { id, answer } = req.params

  try {
    // Get history
    const history = await models.History.findOne({
      token: req.headers.authorization,
    })

    // Save current question/answer
    await models.History.findByIdAndUpdate(history._id, {
      questions: [...history.questions, { id, answer }],
    })

    const { question: questionArray } = await models.Quiz.findById(
      history.idQuiz
    )
      .populate('question')
      .lean()
      .exec()

    let index = questionArray.findIndex((x) => x._id == id)
    const currentQuestion = questionArray[index]
    let found = false
    let result = null

    // Get next question
    while (!found && index < questionArray.length - 1) {
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
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const completeQuiz = (req, res) => {
  res.send('Quiz completado!')
}

module.exports = { getToken, getQuiz, getNextQuestion, completeQuiz }
