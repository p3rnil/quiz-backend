const quizzes = require('../mock/db.json')

const getToken = (_, res) => {
  res.send('sfsdfsdefdsf')
}

const getQuiz = (req, res) => {
  const quiz = quizzes.data.find((x) => x.id == req.params.id)

  try {
    // Get first question
    const firstQuestion = quiz.questions[0]

    // Create quiz history
    const history = {}

    // Save history to db

    res.send(firstQuestion)
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
