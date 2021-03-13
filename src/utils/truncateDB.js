const models = require('../model')

// Delete data
const truncateDB = async () => {
  await models.Question.deleteMany({}, function (err) {})
}

module.exports = truncateDB
