const aspConnect = require('clingo-connect');
const moment = require('moment');

const implementedIntolerances = ["lactose"];

module.exports = {
  intoleranceStatus: {
    UNKNOWN: 'unknown',
    LIKELY: 'likely',
    UNLIKELY: 'unlikely'
  },
  analyzeUserData(foods, symptoms) {
    return this.getIngredients(foods).then(ingredients => this.runSolver(ingredients, symptoms)).then(aspResult => {
      const models = aspResult.models;
      const result = {};
        
      implementedIntolerances.forEach(intolerance => {
        const isInAll = models.every(model => model.indexOf(intolerance) !== -1);
        const isInNone = models.every(model => model.indexOf(`-${intolerance}`) !== -1);
          
        if (isInAll) {
          result[intolerance] = this.intoleranceStatus.LIKELY;
        } else if (isInNone) {
          result[intolerance] = this.intoleranceStatus.UNLIKELY;
        } else {
          result[intolerance] = this.intoleranceStatus.UNKNOWN;
        }
      });
      
      return result;
    });
  },
  // Dummy
  // eslint-disable-next-line no-unused-vars
  getIngredients(foods) {
  // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      resolve([
        {
          type: 'lactose',
          amount: 'few',
          date: moment('2017-05-24 09:30')
        }
      ]);
    });
  },
  runSolver(ingredients, symptoms) {
    return new Promise((resolve, reject) => {
      const rules = [];

      // Generate facts for all ingredients
      ingredients.forEach((ingredient, index) => {
        rules.push(`ingredient(${index}, ${ingredient.type}, ${ingredient.amount}).`);
      });

      // Generate facts for all symptoms
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
          } else {
            reject(`No correlation rules defined for ${ingredient.type}`);
          }
        });
      });

      rules.push(`hasCol(X) :- ingredient(X, A, B), symptom(Y, C, D), correlates(X,Y,E).`);

      const posAmounts = ['few', 'normal', 'much'];
      const posSympType = ['bauchschmerzen', 'kopfschmerzen'];
      const posSympStrength = ['low', 'medium', 'high'];
      const posCorrelStrength = ['low', 'middle', 'high'];

      // Function that generates weights for all combinations of possible
      // amounts, symptomTypes, symptomStrengths and correlationStrengths
      // eslint-disable-next-line no-unused-vars
      const weightFunc = function (intolerance, amount, sympType, sympStrength, correlStrength) {
        // TODO: Implement more weights

        if (intolerance === "lactose") {
          let base = 0;

          if (sympType === "bauchschmerzen") {
            switch (amount) {
              case "few":
                base = 10;
                break;
              case "normal":
                base = 20;
                break;
              case "much":
                base = 30;
                break;
            }
          }

          switch (sympStrength) {
            case "medium":
              base *= 1.1;
              break;
            case "high":
              base *= 1.2;
              break;
          }

          return base;
        }

        // Default
        return 20;
      };

      for (const intolerance of implementedIntolerances) {
        const sumRuleParts = [];

        for (const amount of posAmounts) {
          for (const sympType of posSympType) {
            for (const sympStrenght of posSympStrength) {
              for (const correlStrength of posCorrelStrength) {
                const weight = weightFunc(intolerance, amount, sympType, sympStrenght, correlStrength);
                sumRuleParts.push(`${weight},ingredcol(X,Y) : ingredient(X, ${intolerance}, ${amount}), symptom(Y, ${sympType}, ${sympStrenght}), correlates(X, Y, ${correlStrength})`);
              }
            }
          }
        }

        const negativeWeight = -20;
        sumRuleParts.push(`${negativeWeight},ingrednocol(X) : ingredient(X, ${intolerance}, B), not hasCol(X)`);

        // Add rule to defer user has intolerance if he has correlating symptoms most of the time
        rules.push(`${intolerance} :- #sum { ${sumRuleParts.join(';\n')} } > 100.`);

        // Add rule to defer user cannot have intolerance if he
        // has most of the time no correlating symptoms
        rules.push(`-${intolerance} :- #sum { ${sumRuleParts.join(';\n')} } < -100.`);
      }

      aspConnect.runASPSolver(rules).then(models => {
        resolve({ models, rules });
      }).catch(err => {
        reject(err);
      });
    });
  }
};