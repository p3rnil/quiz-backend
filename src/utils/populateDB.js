const models = require('../model')

const populateDB = async () => {
  const questionA = {
    name: 'Question A',
    type: 'checkbox',
    question: 'What is your gender?',
    answers: ['Female', 'Male', 'Other gender identity'],
  }
  const questionAddedA = await models.Question.create(questionA)

  const questionB = {
    name: 'Question B',
    type: 'checkbox',
    question: 'What is your age?',
    answers: [], //NUMEROS
  }
  const questionAddedB = await models.Question.create(questionB)

  const questionC = {
    name: 'Question C',
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
  }
  const questionAddedC = await models.Question.create(questionC)

  const questionD = {
    name: 'Question D',
    type: 'checkbox',
    question: 'How many years have you teached university courses?',
    answers: [], //NUMEROS
  }
  const questionAddedD = await models.Question.create(questionD)

  const questionE = {
    name: 'Question E',
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
  }
  const questionAddedE = await models.Question.create(questionE)

  const questionF = {
    name: 'Question F',
    type: 'checkbox',
    question: 'Are you responsible for any university course?',
    answers: ['Yes', 'No', 'Not now, but I was it in the past'],
  }
  const questionAddedF = await models.Question.create(questionF)

  const questionG = {
    name: 'Question G',
    type: 'checkbox',
    question: 'Which is the name of the course that you teach?',
    answers: [], //TEXTBOX
  }
  const questionAddedG = await models.Question.create(questionG)

  const questionH = {
    name: 'Question H',
    type: 'checkbox',
    question:
      'Is the course related to Limnology? (i.e., courses on Limnology, Ecology, Hydrology, Water Resources, River Restoration, Aquatic Biogeochemistry, etc.).',
    answers: ['Yes', 'No'],
    dependencyQuestion: questionAddedA._id,
    dependencyAnswer: 'No',
  }

  await models.Question.create(questionH)

  const questionI = {
    name: 'Question I',
    type: 'checkbox',
    question:
      'Do you develop your research activity in the field of limnology or related sciences (e.g. hydrology, freshwater sciences)?',
    answers: ['Yes, mainly', 'Yes, partially', 'No', 'I am not a researcher'],
  }
  const questionAddedI = await models.Question.create(questionI)

  const questionJ = {
    name: 'Question J',
    type: 'checkbox',
    question:
      'Have you actively searched for resources to incorporate the gender perspective in your classes? (i.e., to include female role models in your teaching, understand the importance of gender in students’ opportunities, to raise awareness about gender barriers and bias, etc.).',
    answers: ['Yes', 'No', 'I do not know'],
  }
  const questionAddedJ = await models.Question.create(questionJ)

  const questionK = {
    name: 'Question K',
    type: 'checkbox',
    question:
      'Have you received specific training to incorporate the gender perspective in your classes? (i.e., to include female role models in your teaching, understand the importance of gender in students’ opportunities, to raise awareness about gender barriers and bias, etc.).',
    answers: ['Yes', 'No', 'I do not know'],
  }
  const questionAddedK = await models.Question.create(questionK)

  const questionL = {
    name: 'Question L',
    type: 'checkbox',
    question:
      'Do you use any  policy guidelines to reduce gender bias in teaching?',
    answers: ['Yes', 'No', 'I do not know'],
    dependencyQuestion: questionAddedM._id,
    dependencyAnswer: 'Yes',
  }
  await models.Question.create(questionL)

  const questionM = {
    name: 'Question M',
    type: 'checkbox',
    question:
      'You responded that you use policy guidelines to reduce gender bias in teaching. Which of the following options better describes the institution that developed them?',
    answers: [
      'The university where I teach this course',
      'Another university',
      'A scientific association',
      'A  national or international funding agency',
      'A researcher (e.g. group guidelines)',
      'Other',
    ],
  }
  const questionAddedM = await models.Question.create(questionM)

  const questionN = {
    name: 'Question N',
    type: 'checkbox',
    question:
      'Which of the following concepts related to gender biases and barriers are you familiar with? Mark as many as needed.',
    answers: [
      'Matilda effect',
      'Leaky pipeline',
      'Glass-ceiling',
      'Sticky floor',
      'Horizontal segregation',
      'Imposter syndrome',
      'add other concepts: gender essentialism, stereotype threat, equity vs equality, scientific colonialism',
    ],
  }
  const questionAddedN = await models.Question.create(questionN)

  const questionNN = {
    name: 'Question NN',
    type: 'checkbox',
    question:
      'Regarding the previous concepts, do you teach any of them in the course?',
    answers: ['Yes, I teach at least one of them', 'No', 'I do not know'],
    dependencyQuestion: questionAddedO._id,
    dependencyAnswer: 'No',
  }
  await models.Question.create(questionNN)

  const questionO = {
    name: 'Question O',
    type: 'checkbox',
    question:
      'You responded that you do not teach any of the previous concepts in the course.  Have you considered teaching them in the course?',
    answers: [
      'I have considered teaching at least one of these concepts in the course',
      'I have not considered teaching them in the course but now I think I will',
      'I think these concepts are not relevant for my course',
      'I think these concepts should not be teached in any course',
      'I am unsure / I don´t know',
    ],
  }
  const questionAddedO = await models.Question.create(questionO)

  const questionP = {
    name: 'Question P',
    type: 'checkbox',
    question: 'How many people teach the course this year?',
    answers: [], //NUMEROS
    dependencyQuestion: questionAddedR._id,
    dependencyAnswer: '',
  }
  await models.Question.create(questionP)

  const questionQ = {
    name: 'Question Q',
    type: 'checkbox',
    question:
      'What is the gender identity of the person who is responsible for the course?',
    answers: ['Male', 'Female', 'Other gender identity', 'I do not know'],
  }
  const questionAddedQ = await models.Question.create(questionQ)

  const questionR = {
    //PREGUNTAR COMO VINCULARLAS
    name: 'Question R',
    type: 'checkbox',
    question:
      'What is the gender identity of the people who teach the theory lessons?',
    answers: [
      'Only men',
      'Mostly men (+ 60%)',
      'Gender balanced (40-60% women and 40-60% men)',
      'Mostly women (+ 60%)',
      'Only women',
      'The course has no theory lessons',
      'I do not know',
    ],
    dependencyQuestion: questionAddedS._id,
    dependencyAnswer: 'I do not know', //DE CUALQUIERA QUE RESPONDA
  }
  await models.Question.create(questionR)

  const questionS = {
    //PREGUNTAR COMO VINCULARLAS
    name: 'Question S',
    type: 'checkbox',
    question:
      'What is the gender identity of the people who teach the practical lessons?',
    answers: [
      'Only men',
      'Mostly men (+ 60%)',
      'Gender balanced (40-60% women and 40-60% men)',
      'Mostly women (+ 60%)',
      'Only women',
      'The course has no theory lessons',
      'I do not know',
    ],
    dependencyQuestion: questionAddedT._id,
    dependencyAnswer: 'I do not know', //DE CUALQUIERA QUE RESPONDA
  }
  await models.Question.create(questionS)

  const questionT = {
    name: 'Question T',
    type: 'checkbox',
    question:
      'Have any of the people that teach the course this year a gender identity other than female or male?',
    answers: ['Yes', 'No', 'I do not know'],
  }
  const questionAddedT = await models.Question.create(questionT)

  const questionU = {
    name: 'Question U',
    type: 'checkbox',
    question:
      'Do you think there are gender biases in the research field associated with the course that you selected?',
    answers: ['Yes', 'No', 'I do not know'],
  }
  const questionAddedU = await models.Question.create(questionU)

  const questionV = {
    name: 'Question V',
    type: 'checkbox',
    question:
      'Regarding the course material, do you consider it is gender balanced (e.g., is there the same visibility for men and women researchers)?',
    answers: ['Yes', 'No', 'I don´t know / I didn’t think about it'],
    dependencyQuestion: questionAddedW._id,
    dependencyAnswer: 'No',
  }
  await models.Question.create(questionV)

  const questionW = {
    name: 'Question W',
    type: 'checkbox',
    question:
      'You responded that the course material is not gender balanced (e.g.,  that there is not the same visibility  for men and women researchers). Are you working to change that aspect of the course?',
    answers: [
      'I am working to make it gender balanced',
      'I am planning to make it gender balanced, but I have not started yet',
      'I want to work to make it gender balanced, but I don’t know what to do about it',
      'I don’t think this is a problem',
    ],
  }
  const questionAddedW = await models.Question.create(questionW)

  const questionX = {
    name: 'Question X',
    type: 'checkbox',
    question:
      'Regarding the literature you recommend for your course, do you provide full names (i.e. first and last name) of the authors?',
    answers: [
      'Yes',
      'No',
      'I do not recommend literature for this course',
      'I do not know',
    ],
  }
  const questionAddedX = await models.Question.create(questionX)

  const questionY = {
    name: 'Question Y',
    type: 'checkbox',
    question:
      'Regarding the presentations you use for your course, do you provide full names (i.e. first and last name) of the first authors of the references used?',
    answers: [
      'Yes',
      'No',
      'I do not use presentations for my class / I do not include references on them',
      'I do not know',
    ],
  }
  const questionAddedY = await models.Question.create(questionY)

  const questionZ = {
    name: 'Question Z',
    type: 'checkbox',
    question:
      'Regarding the literature you recommend for your course, what is the gender identity of the first author (or single author) of the bibliographic references?',
    answers: [
      'All are men',
      'Mostly men (+ 60%)',
      'Gender balanced (40-60% women and 40-60% men)',
      'Mostly women (+ 60%)',
      'All are women',
      'I do not know',
    ],
  }
  const questionAddedZ = await models.Question.create(questionZ)

  const questionAB = {
    name: 'Question AB',
    type: 'checkbox',
    question:
      'During the preparation of the course, I included in the presentations used at least one concept developed by female researchers?',
    answers: ['Yes', 'No', 'I do not know'],
  }
  const questionAddedAB = await models.Question.create(questionAB)

  const questionBC = {
    name: 'Question BC',
    type: 'checkbox',
    question:
      'During the preparation of the course, I devoted time specifically to look for female researchers whose work I can use in the course.',
    answers: ['Yes', 'No', 'I do not know'],
  }
  const questionAddedBC = await models.Question.create(questionBC)

  const questionCD = {
    name: 'Question CD',
    type: 'checkbox',
    question:
      'During the preparation of the course, I devoted time specifically to look for researchers that belong to minorities that have been historically excluded from academia for reasons besides their gender identity (i.e. LGBT+ people, racialized people, or people with functional diversity) whose work I can use in the course',
    answers: ['Yes', 'No', 'I do not know'],
  }
  const questionAddedCD = await models.Question.create(questionCD)

  const questionDE = {
    name: 'Question DE',
    type: 'checkbox',
    question:
      'I am aware of the gender composition of my class (i.e. I pay attention to it).',
    answers: [
      'Strongly disagree',
      'Disagree',
      'Neither agree nor disagree',
      'Agree',
      'Strongly agree',
    ],
  }
  const questionAddedDE = await models.Question.create(questionDE)

  const questionEF = {
    name: 'Question EF',
    type: 'checkbox',
    question:
      'I am aware of the gender composition of my class (i.e. I pay attention to it).',
    answers: [
      'Strongly disagree',
      'Disagree',
      'Neither agree nor disagree',
      'Agree',
      'Strongly agree',
    ],
  }
  const questionAddedEF = await models.Question.create(questionEF)

  const questionFG = {
    name: 'Question FG',
    type: 'checkbox',
    question:
      'I am aware if there are students in my class that belong to minorities historically excluded from academia for reasons besides their gender identity (i.e. LGBT+ people, racialized people, or people with functional diversity).',
    answers: [
      'Strongly disagree',
      'Disagree',
      'Neither agree nor disagree',
      'Agree',
      'Strongly agree',
    ],
  }
  const questionAddedFG = await models.Question.create(questionFG)

  const questionGH = {
    name: 'Question GH',
    type: 'checkbox',
    question:
      'Female students participate less than male students during the lectures.',
    answers: [
      'Strongly disagree',
      'Disagree',
      'Neither agree nor disagree',
      'Agree',
      'Strongly agree',
    ],
  }
  const questionAddedGH = await models.Question.create(questionGH)

  const questionHI = {
    name: 'Question HI',
    type: 'checkbox',
    question: 'I actively foster equal participation among genders',
    answers: [
      'Strongly disagree',
      'Disagree',
      'Neither agree nor disagree',
      'Agree',
      'Strongly agree',
    ],
  }
  const questionAddedHI = await models.Question.create(questionHI)

  const itemFound = await models.Question.find({ name: 'Question' })
    .populate('dependencyQuestion')
    .lean()
    .exec()
  console.log(itemFound.length)
}

module.exports = populateDB
