const models = require('../model')

const populateDB = async () => {
  const questions = [
    {
      name: 'Q00',
      question:
        'You are invited to respond to this self-assessment questionnaire about the inclusion of the gender perspective on University teaching. The questionnaire includes aspects about self-awareness, teaching preparation, teaching practices, and evaluation practices. Based on your answers, the system will provide you with some general evaluation as well as guidance to improve the inclusion of the gender perspective on your teaching. The questionnaire will take approximately 10 minutes to complete.\n The questionnaire has been developed by the Gender &amp; Science Group of the Iberian Association of Limnology (AIL) and it is part of Gender-LimnoEdu, a project funded by the European Geophysical Union (EGU). If you have any questions about the questionnaire, please contact genderscienceail@gmail.com.\n Additionally, we would like to save your responses to include them in a research study about the inclusion of the gender perspective on teaching practices. To do so, we will ask you some basic demographic questions. This questionnaire is anonymous, and your responses will be kept completely confidential. Non-personally identifiable data will be collected and no one will be able to link your answers back to you. Participation in this research is completely voluntary. If you decide to participate, you may withdraw at any point during the study, for any reason, and without any prejudice. By clicking the "I consent, I wish to participate in the study" button below, you acknowledge that your participation in the study is voluntary, you are 18 years of age or older, and that you are aware that you may choose to terminate your participation in the study at any time and for any reason. If you prefer to not participate in the study, you can take the self-assessment questionnaire and your responses will not be saved in our server.',
      answers: [
        'I consent, I wish to participate in the study',
        'I do not wish to participate in the study but I want to take the self-assessment questionnaire',
        'I do not wish to participate in the study neither to take the self-assessment questionnaire',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        validation: {
          max: 200,
        },
      },
    },
    {
      info:
        'To start, we just need some information about yourself. Please, mark the appropriate answers',
      name: 'Q01',
      question: 'What is your gender?',
      answers: ['Female', 'Male', 'Other gender identity'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      name: 'Q02',
      question: 'What is your age?',
      answers: [],
      answerInfo: {
        label: 'Age',
        types: ['number'],
        validation: {
          max: 2,
        },
      },
    },
    {
      name: 'Q03',
      question:
        'Do you belong to any underrepresented minority group in academia? Select all that qualify.',
      answers: [
        'Race / ethnic minority',
        'LGBT + (lesbian, gay, bisexual, trans)',
        'People with disabilities',
        '', //MIXTO
        'None',
      ],
      answerInfo: {
        types: [
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox-number',
          'checkbox',
        ],
        validation: {
          max: 5,
        },
      },
    },
    {
      name: 'Q04',
      question: 'How many years have you teached university courses?',
      answers: [],
      answerInfo: {
        label: 'Age',
        types: ['number'],
        validation: {
          max: 2,
        },
      },
    },
    {
      name: 'Q05',
      question: 'What is your current position in academia?',
      answers: [
        'Pre-doctoral (researchers not holding a PhD title, such as undergraduate, master and PhD students)',
        'Post-doctoral (researchers not holding permanent positions that defended their PhD within the last eight years)',
        'Senior non-permanent (researchers not holding permanent positions that defended their PhD more than eight years ago)',
        'Senior permanent (researchers holding permanent positions)',
        'Non-permanent university lecturer (professionals without a PhD and non-permanent position in academia)',
        '', //MIXTO
      ],
      answerInfo: {
        types: [
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox-text',
        ],
        validation: {
          max: 2,
        },
      },
    },
    {
      name: 'Q06',
      question: 'Are you responsible for any university course?',
      answers: ['Yes', 'No', 'Not now, but I was it in the past'],
      answerInfo: {
        type: 'checkbox',
      },
    },
  ]

  const questionsMongo = await models.Question.create(questions)

  await models.Question.findOneAndUpdate(
    { name: 'Q02' },
    { dependencyQuestion: questionsMongo[1], dependencyAnswer: 'Male' }
  )

  await models.Question.findOneAndUpdate(
    { name: 'Q04' },
    {
      dependencyQuestion: questionsMongo[0],
      dependencyAnswer:
        'I do not wish to participate in the study but I want to take the self-assessment questionnaire',
    }
  )

  const quiz = {
    name: 'First quiz',
    question: questionsMongo.map((x) => x._id),
  }

  const quizMongo = await models.Quiz.create(quiz)

  // await models.History.create({
  //   idQuiz: quizMongo._id,
  //   persistent: false,
  //   token: 'sfsdfsdefdsf',
  //   questions: [{ id: questionsMongo[0], answer: 'Female' }],
  // })

  // const itemFound = await models.Question.find({ name: 'Question' })
  //   .populate('dependencyQuestion')
  //   .lean()
  //   .exec()
  // console.log(itemFound.length)
}

module.exports = populateDB
