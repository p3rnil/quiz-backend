const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')
const connect = require('./db')
const request = require('./request/quiz')
const utils = require('./utils')

const start = async () => {
  const app = express()
  app.use(cors())
  const port = config.port

  await connect()
  await utils.truncateDB()
  await utils.populateDB()

  const checkAuthorization = (req, res, next) => {
    try {
      // Check token
      if (!req.headers.authorization) {
        return res.status(500).send('Not authorized')
      }

      // Validate token
      jwt.verify(req.headers.authorization, process.env.SECRET)
    } catch (err) {
      console.log(err.message)
      return res.status(500).send('Not authorized')
    }

    next()
  }

  app.get('/getToken', request.getToken)

  app.get('/getTotalPoints', checkAuthorization, request.getTotalPoints)

  app.get('/quiz/:name', checkAuthorization, request.getQuiz)

  app.get(
    '/nextQuestion/:id/:answer',
    checkAuthorization,
    request.getNextQuestion
  )

  app.post('/completeQuiz', checkAuthorization, request.completeQuiz)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

module.exports = start
