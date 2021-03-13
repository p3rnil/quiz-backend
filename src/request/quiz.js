const models = require('../model')

const getToken = (_, res) => {
  res.send('sfsdfsdefdsf')
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

const getNextQuestion = (req, res) => {
  res.send('Te doy la siguiente pregunta')
}

const completeQuiz = (req, res) => {
  res.send('Quiz completado!')
}

module.exports = { getToken, getQuiz, getNextQuestion, completeQuiz }
