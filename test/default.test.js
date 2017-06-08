const moment = require('moment');
const foodASP = require('../');
const should = require('should');

describe('Default', () => {
  it('should output all intolerances', done => {
    const data = {
      foods: [
        {
          // 
          id: 'M110000',
          amount: 100,
          date: moment('2017-05-24 09:30')
        }
      ],
      symptoms: [
        {
          type: 'bauchschmerzen',
          strength: 'high',
          date: moment('2017-05-24 09:50')
        }
      ]
    };
    
    foodASP.analyzeUserData(data.foods, data.symptoms).should.be.fulfilled().then(intolerances => {
      should(intolerances).be.instanceOf(Object);
      intolerances.should.have.property('lactose', foodASP.intoleranceStatus.UNKNOWN);
      done();
    }).catch(done);
  });
  
  it('should work with example data', done => {
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
          type: 'lactose',
          amount: 'much',
          date: moment('2017-05-25 10:00')
        },
        {
          type: 'lactose',
          amount: 'much',
          date: moment('2017-05-25 11:00')
        },
        {
          type: 'fructose',
          amount: 'normal',
          date: moment('2017-05-26 12:30')
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
        },
        {
          type: 'bauchschmerzen',
          strength: 'medium',
          date: moment('2017-05-25 11:30')
        },
        {
          type: 'bauchschmerzen',
          strength: 'medium',
          date: moment('2017-05-25 12:45')
        },
        {
          type: 'bauchschmerzen',
          strength: 'medium',
          date: moment('2017-05-25 10:10')
        }
      ]
    };

    foodASP.runSolver(data.ate, data.symptoms).should.be.fulfilled().then(result => {
      should(result.models).be.instanceOf(Array).and.have.length(1);
      result.models[0].should.containEql('lactose').and.not.containEql('-lactose');
      should(result.rules).be.instanceOf(Array);

      done();
    }).catch(done);
  });
});