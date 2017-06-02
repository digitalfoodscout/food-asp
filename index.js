const aspConnect = require('clingo-connect');

module.exports = {
  runSolver(ingredients, symptoms) {
    return new Promise((resolve, reject) => {
      const rules = [];

      ingredients.forEach((ingredient, index) => {
        rules.push(`ingredient(${index}, ${ingredient.type}, ${ingredient.amount}).`);
      });

      symptoms.forEach((symptom, index) => {
        rules.push(`symptom(${index}, ${symptom.type}, ${symptom.strength}).`);
      });

      const correlMap = {
        lactose: {
          high: [0, 15],
          middle: [15, 30],
          low: [30, 60]
        },
        fructose: {
          high: [0, 0],
          middle: [1, 1],
          low: [2, 2]
        }
      };

      // Generate correlations
      ingredients.forEach((ingredient, ingrIndex) => {
        symptoms.forEach((symptom, sympIndex) => {
          const difference = symptom.date.diff(ingredient.date) / (60 * 1000);

          const correlRules = correlMap[ingredient.type];

          if (correlRules !== undefined) {
            for (const key of Object.keys(correlRules)) {
              if (difference >= correlRules[key][0] && difference <= correlRules[key][1]) {
                rules.push(`correlates(${ingrIndex}, ${sympIndex}, ${key}).`);
                break;
              }
            }
          }
          else {
            reject(`No correlation rules defined for ${ingredient.type}`);
          }
        });
      });

      rules.push(`hasCol(X) :- ingredient(X, A, B), symptom(Y, C, D), correlates(X,Y,E).`);

      const posAmounts = ['few', 'normal', 'much'];
      const posSympType = ['bauchschmerzen', 'kopfschmerzen'];
      const posSympStrength = ['low', 'medium', 'high'];
      const posCorrelStrength = ['low', 'middle', 'high'];

      // eslint-disable-next-line no-unused-vars
      const weightFunc = function (amount, sympType, sympStrength, correlStrength) {
        return 20;
      };

      const sumRuleParts = [];

      for (const amount of posAmounts) {
        for (const sympType of posSympType) {
          for (const sympStrenght of posSympStrength) {
            for (const correlStrength of posCorrelStrength) {
              const weight = weightFunc(amount, sympType, sympStrenght, correlStrength);
              sumRuleParts.push(`${weight},ingredcol(X,Y) : ingredient(X, lactose, ${amount}), symptom(Y, ${sympType}, ${sympStrenght}), correlates(X, Y, ${correlStrength})`);
            }
          }
        }
      }

      const negativeWeight = -20;
      sumRuleParts.push(`${negativeWeight},ingrednocol(X) : ingredient(X, lactose, B), not hasCol(X)`);

      rules.push(`lactose :- #sum { ${sumRuleParts.join(';\n')} } > 20.`);

      aspConnect.runASPSolver(rules).then(models => {
        resolve({models, rules});
      }).catch(err => {
        reject(err);
      });
    });
  }
};