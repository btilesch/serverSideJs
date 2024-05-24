const chai = require('chai');
const expect = chai.expect;
const getMA01MW = require('../middleware/ma01/getMA01MW');

describe('getMA01 middleware', () => {
  it('should return ma01 recipe', function (done) {
    const reqMock = {
      params: {
        ma01Id: 'testId',
      },
    };
    const resMock = {
      locals: {},
    };
    const MA01ModelMock = {
      findOne: (param) => {
        expect(param).to.be.eql({ _id: 'testId' });
        return Promise.resolve({ _id: 'testId' });
      },
    };
    const middleware = getMA01MW({ MA01Model: MA01ModelMock });

    middleware(reqMock, resMock, (err) => {
      try {
        expect(err).to.be.undefined;
        expect(resMock.locals.ma01).to.be.eql({ _id: 'testId' });
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('should call next with error if findOne throws an error', function (done) {
    const errorMock = new Error('test error');
    const reqMock = {
      params: {
        ma01Id: 'testId',
      },
    };
    const resMock = {
      locals: {},
    };
    const MA01ModelMock = {
      findOne: (param) => {
        expect(param).to.be.eql({ _id: 'testId' });
        return Promise.reject(errorMock);
      },
    };
    const middleware = getMA01MW({ MA01Model: MA01ModelMock });

    middleware(reqMock, resMock, (err) => {
      try {
        expect(err).to.be.eql(errorMock);
        expect(resMock.locals.ma01).to.be.undefined;
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('should call next with 404 error if no ma01 is found', function (done) {
    const reqMock = {
      params: {
        ma01Id: 'testId',
      },
    };
    const resMock = {
      locals: {},
    };
    const MA01ModelMock = {
      findOne: (param) => {
        expect(param).to.be.eql({ _id: 'testId' });
        return Promise.resolve(null);
      },
    };
    const middleware = getMA01MW({ MA01Model: MA01ModelMock });

    middleware(reqMock, resMock, (err) => {
      try {
        expect(err).to.be.an.instanceof(Error);
        expect(err.status).to.eql(404);
        expect(resMock.locals.ma01).to.be.undefined;
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
