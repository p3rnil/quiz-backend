const models = require('../model')

// Delete data
const truncateDB = async () => {
  await models.Question.deleteMany({}, function (err) {})
  await models.Quiz.deleteMany({}, function (err) {})
}

module.exports = truncateDB
