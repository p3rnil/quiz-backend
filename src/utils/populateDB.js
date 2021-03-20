const models = require('../model')

const populateDB = async () => {
  const questions = [
    {
      info:
        'To start, we just need some information about yourself. Please, mark the appropriate answers',
      name: 'Q01',
      type: 'checkbox',
      question: 'What is your gender?',
      answers: ['Female', 'Male', 'Other gender identity'],
    },
    {
      name: 'Q02',
      type: 'checkbox',
      question: 'What is your age?',
      answers: [],
    },
    {
      name: 'Q03',
      type: 'checkbox',
      question:
        'Do you belong to any underrepresented minority group in academia? Select all that qualify.',
      answers: [
        'Race / ethnic minority',
        'LGBT + (lesbian, gay, bisexual, trans)',
        'People with disabilities',
        '', //MIXTO
        'None',
      ],
    },
    {
      name: 'Q04',
      type: 'textbox',
      question: 'How many years have you teached university courses?',
      answers: [],
    },
    {
      name: 'Q05',
      type: 'checkbox',
      question: 'What is your current position in academia?',
      answers: [
        'Pre-doctoral (researchers not holding a PhD title, such as undergraduate, master and PhD students)',
        'Post-doctoral (researchers not holding permanent positions that defended their PhD within the last eight years)',
        'Senior non-permanent (researchers not holding permanent positions that defended their PhD more than eight years ago)',
        'Senior permanent (researchers holding permanent positions)',
        'Non-permanent university lecturer (professionals without a PhD and non-permanent position in academia)',
        '', //MIXTO
      ],
    },
    {
      name: 'Q06',
      type: 'checkbox',
      question: 'Are you responsible for any university course?',
      answers: ['Yes', 'No', 'Not now, but I was it in the past'],
    },
  ]

  const questionsMongo = await models.Question.create(questions)

  await models.Question.findOneAndUpdate(
    { name: 'Q02' },
    { dependencyQuestion: questionsMongo[0], dependencyAnswer: 'Male' }
  )

  const quiz = {
    name: 'First quiz',
    question: questionsMongo.map((x) => x._id),
  }

  const quizMongo = await models.Quiz.create(quiz)

  await models.History.create({
    idQuiz: quizMongo._id,
    persistent: false,
    token: 'sfsdfsdefdsf',
    questions: [{ id: questionsMongo[0], answer: 'Female' }],
  })

  // const itemFound = await models.Question.find({ name: 'Question' })
  //   .populate('dependencyQuestion')
  //   .lean()
  //   .exec()
  // console.log(itemFound.length)
}

module.exports = populateDB
