const aspConnect = require('clingo-connect');
const moment = require('moment');

const data = {
    ate: [
        {
            type: "lactose",
            date: moment("2017-05-24 09:30")
        },
        {
            type: "lactose",
            date: moment("2017-05-24 11:20")
        },
        {
            type: "fructose",
            date: moment("2017-05-24 11:30")
        }
    ],
    symptoms: [
        {
            type: "bauchschmerzen",
            date: moment("2017-05-24 09:50")
        }
    ]
};

const numLactose = data.ate.reduce((acc, val) => val.type === "lactose" ? acc+1 : acc, 0);

const rules = [
    `intolerance(lactose) :- ate(1..${numLactose}, lactose), symptom(1..${numLactose}, bauchschmerzen), not -intolerance(lactose).`,
    `-intolerance(lactose) :- ate(1..${numLactose}, lactose), not symptom(1..${numLactose}, bauchschmerzen).`
];

data.ate.forEach((ate, index) => {
   rules.push(`ate(${index}, ${ate.type}).`);

   data.symptoms.forEach(symptom => {
      const difference = symptom.date.diff(ate.date);

      if(difference > 0 && difference <= 45 * 60 * 1000) {
          rules.push(`symptom(${index}, ${symptom.type}).`);
      }
   });
});

aspConnect.runASPSolver(rules).then(models => {
    console.log(models);
}).catch(err => {
    console.log(err);
});