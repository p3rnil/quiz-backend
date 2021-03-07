const express = require('express')
const config = require('./config')
const connect = require('./db')
const request = require('./request/quiz')

const start = async () => {
  const app = express()
  const port = config.port

  connect()

  const checkAuthorization = (req, res, next) => {
    // Check token
    if (!req.headers.authorization) {
      console.log('Not authorized')
      return res.status(500).send('Not authorized')
    }
    console.log('Authorized')
    next()
  }

  app.get('/getToken', request.getToken)

  app.get('/quiz/:id', checkAuthorization, request.getQuiz)

  app.get('/nextQuestion', checkAuthorization, request.getNextQuestion)

  app.post('/completeQuiz', checkAuthorization, request.completeQuiz)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

module.exports = start
