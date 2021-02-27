const express = require('express')
const quizzes = require('./mock/db.json')

const start = async () => {
  const app = express()
  const port = 3000

  // TODO: create token, Create history
  app.get('/quiz/:id', (req, res) => {
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
  })

  app.get('/nextQuestion', (req, res) => {
    res.send('Te doy la siguiente pregunta')
  })

  app.post('/completeQuiz', (req, res) => {
    res.send('Quiz completado!')
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

module.exports = start
