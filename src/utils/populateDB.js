const models = require('../model')

const populateDB = async () => {
  const questionA = {
    name: 'Question A',
    type: 'checkbox',
    question: 'Como estas hoy?',
    answers: ['1', '2', '3', '4'],
  }

  const questionAddedA = await models.Question.create(questionA)

  const questionB = {
    name: 'Question B',
    type: 'checkbox',
    question: 'Yo salgo de lo que hayas respondido antes!',
    answers: ['5', '6', '7', '8'],
    dependencyQuestion: questionAddedA._id,
    dependencyAnswer: '3',
  }

  await models.Question.create(questionB)

  const itemFound = await models.Question.find({ name: 'Question B' })
    .populate('dependencyQuestion')
    .lean()
    .exec()
  console.log(itemFound.length)
}

module.exports = populateDB
