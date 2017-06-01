const aspConnect = require('clingo-connect')
const moment = require('moment')
const logger = require('./logger');

const data = {
  ate: [
    {
      type: 'lactose',
      amount: 'few',
      date: moment('2017-05-24 09:30')
    },
    {
      type: 'lactose',
      amount: 'much',
      date: moment('2017-05-24 11:20')
    },
    {
      type: 'fructose',
      amount: 'normal',
      date: moment('2017-05-24 11:30')
    }
  ],
  symptoms: [
    {
      type: 'bauchschmerzen',
      strength: 'low',
      date: moment('2017-05-24 09:50')
    },
    {
      type: 'bauchschmerzen',
      strength: 'medium',
      date: moment('2017-05-24 11:30')
    }
  ]
}

const rules = []

let sumRule = 'lactose :- #sum {  '

data.ate.forEach((ate, index) => {
  const ateRule = `ate(${index}, ${ate.amount}, ${ate.type})`
  rules.push(ateRule + '.')

  let ateWeight = 0

  switch (ate.type) {
    case 'lactose':
      switch (ate.amount) {
        case 'much':
          ateWeight = -15
          break
        case 'few':
          ateWeight = -5
          break
        case 'normal':
          ateWeight = -10
          break
      }
      break;
    case 'fructose':
      // TODO: Implement
      break;
  }

  sumRule += `${ateWeight},${ateRule} : ${ateRule}; `

  data.symptoms.forEach(symptom => {
    const difference = symptom.date.diff(ate.date)

    if (difference > 0 && difference <= 45 * 60 * 1000) {
      const symptRule = `symptom(${index}, ${symptom.strength}, ${symptom.type})`
      rules.push(symptRule + '.')

      let symptWeight = 0

      switch (symptom.type) {
        case 'bauchschmerzen':
          symptWeight = Math.abs(ateWeight * 2)
          break
        case 'kopfschmerzen':
          symptWeight = Math.abs(ateWeight)
          break
      }

      sumRule += `${symptWeight},${symptRule} : ${symptRule}; `
    }
  })
})

sumRule = sumRule.slice(0, -2)
sumRule += `} > 0.`

rules.push(sumRule)

logger.debug(rules.join('\n'))

aspConnect.runASPSolver(rules).then(models => {
  logger.info(models)
}).catch(err => {
  logger.error(err)
})
