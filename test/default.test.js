const moment = require('moment');
const foodASP = require('../');
const should = require('should');

describe('Default', function () {
  it('should work with example data', function (done) {
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
    };

    foodASP.runSolver(data.ate, data.symptoms).should.be.fulfilled().then((result) => {
      should(result.models).be.instanceOf(Array).and.have.length(1);
      result.models[0].should.containEql('lactose');
      should(result.rules).be.instanceOf(Array);

      done();
    }).catch(done);
  });
});