const jwt = require('jsonwebtoken')
const models = require('../model')

const getToken = (_, res) => {
  const token = jwt.sign({}, process.env.SECRET)
  res.send(token)
}

const getTotalPoints = async (req, res) => {
  try {
    const history = await models.History.findOne({
      token: req.headers.authorization,
    })

    res.send({ total_points: history.total_points })
  } catch (error) {
    res.status(500).send(error.message)
  }
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
    let history = await models.History.findOne({
      token: req.headers.authorization,
    })

    // Sum points answer
    const questionAnswered = await models.Question.findById(id)
    let total_points = history.total_points

    if (questionAnswered.answerInfo.points.length > 0) {
      const indexQuestionAnswered = questionAnswered.answers.indexOf(answer)
      const pointQuestionAnswered =
        questionAnswered.answerInfo.points[indexQuestionAnswered]
      total_points += pointQuestionAnswered
    }

    let persistent = false
    if (answer === 'I consent, I wish to participate in the study') {
      persistent = true
    }

    // Save current question/answer
    history = await models.History.findByIdAndUpdate(
      history._id,
      {
        questions: [...history.questions, { id, answer }],
        total_points: total_points,
        persistent,
      },
      { new: true }
    )

    const { question: questionArray } = await models.Quiz.findById(
      history.idQuiz
    )
      .populate('question')
      .lean()
      .exec()

    let index = questionArray.findIndex((x) => x._id == id)
    const currentQuestion = questionArray[index]
    let found = false
    let isFirst = true
    let result = null

    // Get next question
    while (!found && index < questionArray.length - 1) {
      if (isFirst && !questionArray[index + 1].dependencyQuestion) {
        result = questionArray[index + 1]
        isFirst = false
      } else if (questionArray[index + 1].dependencyQuestion) {
        if (
          questionArray[index + 1].dependencyQuestion.equals(
            currentQuestion._id
          )
        ) {
          if (
            questionArray[index + 1].dependencyAnswer == answer ||
            (questionArray[index + 1].dependencyAnswer == '1>' && answer > 1)
          ) {
            result = questionArray[index + 1]
            found = true
          }
        }
      }
      index++
    }

    if (!result) {
      // Remove history
      if (!history.persistent) {
        await models.History.findByIdAndRemove(history._id)
      }
      res.send({ isEndQuiz: true })
    } else {
      result = await models.Question.findById(result._id)
      res.send(result)
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const completeQuiz = (req, res) => {
  res.send('Quiz completado!')
}

module.exports = {
  getToken,
  getQuiz,
  getNextQuestion,
  completeQuiz,
  getTotalPoints,
}
