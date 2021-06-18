const models = require('../model')

const populateDB = async () => {
  const questions = [
    {
      name: 'Q00',
      question:
        'You are invited to respond to this self-assessment questionnaire about the inclusion of the gender perspective on University teaching. The questionnaire includes aspects about self-awareness, teaching preparation, teaching practices, and evaluation practices. Based on your answers, the system will provide you with some general evaluation as well as guidance to improve the inclusion of the gender perspective on your teaching. The questionnaire will take approximately 10 minutes to complete.\n The questionnaire has been developed by the Gender & Science Group of the Iberian Association of Limnology (AIL) and it is part of Gender-LimnoEdu, a project funded by the European Geophysical Union (EGU). If you have any questions about the questionnaire, please contact genderscienceail@gmail.com.\n Additionally, we would like to save your responses to include them in a research study about the inclusion of the gender perspective on teaching practices. To do so, we will ask you some basic demographic questions. This questionnaire is anonymous, and your responses will be kept completely confidential. Non-personally identifiable data will be collected and no one will be able to link your answers back to you. Participation in this research is completely voluntary. If you decide to participate, you may withdraw at any point during the study, for any reason, and without any prejudice. By clicking the "I consent, I wish to participate in the study" button below, you acknowledge that your participation in the study is voluntary, you are 18 years of age or older, and that you are aware that you may choose to terminate your participation in the study at any time and for any reason. If you prefer to not participate in the study, you can take the self-assessment questionnaire and your responses will not be saved in our server.',
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
        'To start, we just need some information about yourself. Please, mark the appropriate answers.',
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
        'Race or ethnic minority',
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
          'checkbox-text',
          'checkbox',
        ],
        validation: {
          max: 200,
        },
      },
    },
    {
      name: 'Q04',
      question: 'How many years have you taught university courses?',
      answers: [],
      answerInfo: {
        label: 'Years',
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
          max: 200,
        },
      },
    },
    {
      name: 'Q06',
      question: 'Are you responsible for any university course?',
      answers: ['Yes', 'No', 'Not now, but I did in the past'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      info:
        'To answer the questionnaire, you should focus on one of the courses you teach. Ideally, you should focus on a course in which you have participated in preparing or improving the teaching material. It is best if you focus on a course that you have the position to improve.',
      name: 'Q07',
      question: 'Which is the name of the course that you teach?',
      answers: [], //TEXTBOX
      answerInfo: {
        types: ['checkbox-text'],
        validation: {
          max: 200,
        },
      },
    },
    {
      name: 'Q08', ///7
      question:
        'Is the course related to Limnology? (i.e., courses on Limnology, Ecology, Hydrology, Water Resources, River Restoration, Aquatic Biogeochemistry, etc.).',
      answers: ['Yes', 'No'],
      answerInfo: {
        types: ['checkbox', 'checkbox'],
      },
    },
    {
      name: 'Q09',
      question:
        'Do you develop your research activity in the field of limnology or related sciences (e.g. hydrology, freshwater sciences)?',
      answers: ['Yes, mainly', 'Yes, partially', 'No', 'I am not a researcher'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      name: 'Q010',
      question:
        'Have you actively searched for resources to incorporate the gender perspective in your classes? (i.e., to include female role models in your teaching, understand the importance of gender in students’ opportunities, to raise awareness about gender barriers and bias, etc.).',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [100, 33, 33],
      },
    },
    {
      name: 'Q011',
      question:
        'Have you received specific training to incorporate the gender perspective in your classes? (i.e., to include female role models in your teaching, understand the importance of gender in students’ opportunities, to raise awareness about gender barriers and bias, etc.).',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [100, 33, 33],
      },
    },
    {
      name: 'Q012', //11
      question:
        'Do you use any policy guidelines to reduce gender bias in teaching?',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [100, 33, 33],
      },
    },
    {
      name: 'Q013',
      question:
        'You responded that you use policy guidelines to reduce gender bias in teaching. Which of the following options better describes the institution that developed them?',
      answers: [
        'The university where I teach this course',
        'Another university',
        'A scientific association',
        'A national or international funding agency',
        'A researcher (e.g. group guidelines)',
        'Other',
      ],
      answerInfo: {
        types: [
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
        ],
      },
    },
    {
      name: 'Q014',
      question:
        'Which of the following concepts related to gender biases and barriers are you familiar with? Mark as many as needed.',
      answers: [
        'Matilda effect',
        'Leaky pipeline',
        'Glass-ceiling',
        'Sticky floor',
        'Horizontal segregation',
        'Imposter syndrome',
        'Tokenism',
        'Gender essentialism',
      ],
      answerInfo: {
        types: [
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
        ],
        points: [25, 25, 25, 25, 25, 25, 25, 25],
      },
    },
    {
      name: 'Q015', //14
      question:
        'Regarding the previous concepts, do you teach any of them in the course?',
      answers: ['Yes, I teach at least one of them', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [100, 0, 0],
      },
    },
    {
      name: 'Q016',
      question:
        'You responded that you do not teach any of the previous concepts in the course.  Have you considered teaching them in the course?',
      answers: [
        'I have considered teaching at least one of these concepts in the course',
        'I have not considered teaching them in the course but now I think I will',
        'I think these concepts are not relevant for my course',
        'I think these concepts should not be taught in any course',
        'I am unsure or I do not know',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [68, 68, 33, 4, 33],
      },
    },
    {
      name: 'Q017',
      question: 'How many people teach the course this year?',
      answers: [],
      answerInfo: {
        label: 'People',
        types: ['number'],
        validation: {
          max: 2,
        },
      },
    },
    {
      name: 'Q018',
      question:
        'What is the gender identity of the person who is responsible for the course?',
      answers: ['Male', 'Female', 'Other gender identity', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      //PREGUNTAR COMO VINCULARLAS
      name: 'Q019',
      question:
        'What is the gender identity of the people who teach the theory lessons?',
      answers: [
        'Only men',
        'Mostly men (+ 60 percentage)',
        'Gender balanced (40-60 percentage women and 40-60 percentage men)',
        'Mostly women (+ 60 percentage)',
        'Only women',
        'The course has no theory lessons',
        'I do not know',
      ],
      answerInfo: {
        types: [
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
        ],
      },
    },
    {
      //PREGUNTAR COMO VINCULARLAS
      name: 'Q020',
      question:
        'What is the gender identity of the people who teach the practical lessons?',
      answers: [
        'Only men',
        'Mostly men (+ 60 percentage)',
        'Gender balanced (40-60 percentage women and 40-60 percentage men)',
        'Mostly women (+ 60 percentage)',
        'Only women',
        'The course has no practical lessons',
        'I do not know',
      ],
      answerInfo: {
        types: [
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
        ],
      },
    },
    {
      name: 'Q021',
      question:
        'Have any of the people that teach the course this year a gender identity other than female or male?',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      name: 'Q022',
      question:
        'Do you think there are gender biases in the research field associated with the course that you selected?',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [63, 20, 20],
      },
    },
    {
      name: 'Q023',
      question:
        'In your opinion, is the course material gender balanced? (e.g., there is the same visibility for men and women researchers).',
      answers: ['Yes', 'No', 'I do not know or I did not think about it'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [63, 0, 0],
      },
    },
    {
      name: 'Q024', //23
      question:
        'You responded that the course material is not gender balanced (e.g., that there is not the same visibility  for men and women researchers). Are you working to change that aspect of the course?',
      answers: [
        'I am working to make it gender balanced',
        'I am planning to make it gender balanced, but I have not started yet',
        'I want to work to make it gender balanced, but I don’t know what to do about it',
        'I do not think this is a problem',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [41, 20, 20, 0],
      },
    },
    {
      name: 'Q025',
      question:
        'Regarding the literature you recommend for your course, do you provide full names (i.e. first and last name) of the authors?',
      answers: [
        'Yes',
        'No',
        'I do not recommend literature for this course',
        'I do not know',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [61, 20, 41, 41],
      },
    },
    {
      name: 'Q026',
      question:
        'Regarding the presentations you use for your course, do you provide full names (i.e. first and last name) of the first authors of the references used?',
      answers: [
        'Yes',
        'No',
        'I do not use presentations for my class or I do not include references on them',
        'I do not know',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [61, 20, 41, 41],
      },
    },
    {
      info:
        'For this question, better if you have a list of the references used in your course at hand before proceeding.',
      name: 'Q027',
      question:
        'Regarding the literature you recommend for your course, what is the gender identity of the first author (or single author) of the bibliographic references?',
      answers: [
        'All are men',
        'Mostly men (+ 60 percentage)',
        'Gender balanced (40-60 percentage women and 40-60 percentage men)',
        'Mostly women (+ 60 percentage)',
        'All are women',
        'I do not know',
      ],
      answerInfo: {
        types: [
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
          'checkbox',
        ],
        points: [21, 41, 61, 41, 20, 20],
      },
    },
    {
      name: 'Q028',
      question:
        'During the preparation of the course, I included in the presentations used at least one concept developed by female researchers',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [61, 20, 41],
      },
    },
    {
      name: 'Q029',
      question:
        'During the preparation of the course, I spent time specifically to look for female researchers whose work I can use in the course.',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [61, 20, 20],
      },
    },
    {
      name: 'Q030',
      question:
        'During the preparation of the course, I spent time specifically to look for researchers that belong to minorities that have been historically excluded from academia for reasons besides their gender identity (i.e. LGBT+ people, racialized people, or people with functional diversity) whose work I can use in the course.',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      name: 'Q031',
      info:
        'Please, indicate how much do you agree with the following statements about your teaching practices:',
      question:
        'I am aware of the gender composition of my class (i.e. I pay attention to it).',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [8, 17, 25, 33, 42],
      },
    },
    {
      name: 'Q032',
      question:
        'I am aware if there are students in my class that belong to minorities historically excluded from academia for reasons besides their gender identity (i.e. LGBT+ people, racialized people, or people with functional diversity).',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      name: 'Q033',
      question:
        'I am aware if female students participate less, more or equally than male students during the lectures',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [8, 17, 25, 33, 42],
      },
    },
    {
      name: 'Q034',
      question: 'I actively foster equal participation among genders',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [8, 17, 25, 33, 42],
      },
    },
    {
      name: 'Q035',
      question:
        'I use gender-neutral language (i.e., language that avoids bias towards a particular social gender. In English, this includes use of nouns that are not gender-specific to refer to roles or professions, formation of phrases in a coequal manner, and discontinuing the blanket use of male terms).',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [8, 17, 25, 33, 42],
      },
    },
    {
      name: 'Q036',
      question:
        'I actively avoid using gender stereotypical remarks during my classes.',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [8, 17, 25, 33, 42],
      },
    },
    {
      name: 'Q037',
      question:
        'When teaching about a concept, I highlight who coined that concept (i.e. I present a direct link to the students between the concept and the researcher that developed it)',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [8, 17, 25, 33, 42],
      },
    },
    {
      name: 'Q038',
      question:
        'When sharing the research of female researchers with my students, I highlight that these scientific contributions were made by women.',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [8, 17, 25, 33, 42],
      },
    },
    {
      name: 'Q039',
      question:
        'When sharing the research of people belonging to minorities that have been historically excluded from academia for reasons besides their gender identity (i.e. LGBT+ people, racialized people, or people with functional diversity), I highlight that these scientific contributions were made by researchers belonging to those minorities.',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      name: 'Q040',
      question:
        'When sharing the research of female researchers, I invite my students to reflect upon gender bias in academia.',
      answers: [
        'Strongly disagree',
        'Disagree',
        'Neither agree nor disagree',
        'Agree',
        'Strongly agree',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox', 'checkbox', 'checkbox'],
        points: [8, 17, 25, 33, 42],
      },
    },
    {
      name: 'Q041',
      info:
        'Please, answer the following questions regarding your evaluation practices',
      question:
        'Do the students sign their final exam (i.e. most important exercise for evaluation) with full name (first and last name) or with their student or personal ID?',
      answers: [
        'They use their full name',
        'They use their student or personal ID',
        'We use a different system',
      ],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      name: 'Q042',
      question:
        'You responded you use a different system, do you use an alpha-numerical code that does not allow you to identify the student while reviewing?',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
      },
    },
    {
      name: 'Q043',
      question:
        'Do you use gender-disaggregated data to measure potential differences on your students’ performance by gender?',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [300, 100, 100],
      },
    },
    {
      name: 'Q044',
      question:
        'When you detect a certain level of self-bias related to gender, you ask other colleagues for their opinion?',
      answers: ['Yes', 'No', 'I do not know'],
      answerInfo: {
        types: ['checkbox', 'checkbox', 'checkbox'],
        points: [300, 100, 100],
      },
    },
    {
      name: 'Q045',
      info:
        'You responded that your course is related to Limnology (i.e., courses on Limnology, Ecology, Hydrology, Water Resources, River Restoration, Aquatic Biogeochemistry, etc.). Please, answer the following questions regarding teaching a course related to Limnology. Limnologists are considered those with their main research field in freshwaters.',
      question:
        'Please, write the names of three MALE limnologists whose research work you use in this course. Please, write their full names separated by commas.',
      answers: [],
      answerInfo: {
        types: ['checkbox-text'],
        validation: {
          max: 200,
        },
      },
    },
    {
      name: 'Q046',
      question:
        'Please, write the names of three FEMALE limnologists whose research work you use in this course. Please, write their full names separated by commas.',
      answers: [],
      answerInfo: {
        types: ['checkbox-text'],
        validation: {
          max: 200,
        },
      },
    },
    {
      name: 'Q047',
      question:
        'Please, write here any other comment regarding this survey that you would like us to know.',
      answers: [],
      answerInfo: {
        types: ['checkbox-text'],
        validation: {
          max: 200,
        },
      },
    },
  ]

  const questionsMongo = await models.Question.create(questions)

  await models.Question.findOneAndUpdate(
    { name: 'Q013' },
    { dependencyQuestion: questionsMongo[12], dependencyAnswer: 'Yes' }
  )

  await models.Question.findOneAndUpdate(
    { name: 'Q016' },
    { dependencyQuestion: questionsMongo[15], dependencyAnswer: 'No' }
  )

  await models.Question.findOneAndUpdate(
    { name: 'Q019' },
    { dependencyQuestion: questionsMongo[17], dependencyAnswer: '1>' } //PREGUNTAR DEBE SER MAYOR QUE 1 17
  )

  await models.Question.findOneAndUpdate(
    { name: 'Q020' },
    { dependencyQuestion: questionsMongo[17], dependencyAnswer: '1>' } //PREGUNTAR DEBE SER MAYOR QUE 1
  )

  await models.Question.findOneAndUpdate(
    { name: 'Q021' },
    { dependencyQuestion: questionsMongo[17], dependencyAnswer: '1>' } //PREGUNTAR DEBE SER MAYOR QUE 1
  )

  await models.Question.findOneAndUpdate(
    { name: 'Q024' },
    { dependencyQuestion: questionsMongo[23], dependencyAnswer: 'No' }
  )

  await models.Question.findOneAndUpdate(
    { name: 'Q042' },
    {
      dependencyQuestion: questionsMongo[41],
      dependencyAnswer: 'We use a different system',
    }
  )

  await models.Question.findOneAndUpdate(
    { name: 'Q045' },
    {
      dependencyQuestion: questionsMongo[8],
      dependencyAnswer: 'Yes',
    }
  )

  await models.Question.findOneAndUpdate(
    { name: 'Q046' },
    {
      dependencyQuestion: questionsMongo[8],
      dependencyAnswer: 'Yes',
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
