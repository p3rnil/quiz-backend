const express = require('express')
const quizzes = require('./mock/db.json')

const start = async () => {
  const app = express()
  const port = 3000

  const checkAuthorization = (req, res, next) => {
    // Check token
    if (!req.headers.authorization) {
      console.log('Not authorized')
      return res.status(500).send('Not authorized')
    }
    console.log('Authorized')
    next()
  }

  // TODO: create token, Create history

  app.get('/getToken', (_, res) => {
    res.send('sfsdfsdefdsf')
  })

  app.get('/quiz/:id', checkAuthorization, (req, res) => {
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

  app.get('/nextQuestion', checkAuthorization, (req, res) => {
    res.send('Te doy la siguiente pregunta')
  })

  app.post('/completeQuiz', checkAuthorization, (req, res) => {
    res.send('Quiz completado!')
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

module.exports = start
