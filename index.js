const aspConnect = require('clingo-connect');
const moment = require('moment');

const data = {
    ate: [
        {
            type: "lactose",
            date: moment("2017-05-24 09:30")
        },
        {
            type: "viel_lactose",
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
        },
        {
            type: "bauchschmerzen",
            date: moment("2017-05-24 11:30")
        }
    ]
};

const numLactose = data.ate.reduce((acc, val) => val.type === "lactose" ? acc+1 : acc, 0);

const rules = [];

let bigRule = "lactose :- #sum {  ";

data.ate.forEach((ate, index) => {
    const ateRule = `ate(${index}, ${ate.type})`;
   rules.push(ateRule + ".");

    let ateWeight = 0;

    switch(ate.type) {
        case "viel_lactose":
            ateWeight = -15;
            break;
        case "wenig_lactose":
            ateWeight = -5;
            break;
        case "lactose":
            ateWeight = -10;
            break;
    }

    bigRule += `${ateWeight},${ateRule} : ${ateRule}; `;

    data.symptoms.forEach(symptom => {
      const difference = symptom.date.diff(ate.date);

      if(difference > 0 && difference <= 45 * 60 * 1000) {
          const symptRule = `symptom(${index}, ${symptom.type})`;
          rules.push(symptRule + ".");

          let symptWeight = 0;

          switch(symptom.type) {
              case "bauchschmerzen":
                  symptWeight = Math.abs(ateWeight * 2);
                  break;
              case "kopfschmerzen":
                  symptWeight = Math.abs(ateWeight);
                  break;
          }

          bigRule += `${symptWeight},${symptRule} : ${symptRule}; `;
      }
   });
});


bigRule = bigRule.slice(0,-2);
bigRule += `} > 0.`;

rules.push(bigRule);

//console.log(rules.join('\n'));

aspConnect.runASPSolver(rules).then(models => {
    console.log(models);
}).catch(err => {
    console.log(err);
});