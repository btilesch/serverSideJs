const chai = require('chai');
const expect = chai.expect;
const authMW = require('../middleware/auth/authMW');

describe('getMA01 middleware', () => {
  it('should redirect to /login if user is not in session', function (done) {
    const reqMock = {
      session: {
        loggedIn: true,
      },
    };
    const resMock = {
      redirect: (to) => {
        expect(to).to.be.eql('/login');
        done();
      },
    };

    const middleware = authMW({});
    middleware(reqMock, resMock, (err) => {
      expect(true, 'Should not call next()').to.be.eql(false);
      expect(err).to.be.undefined;
      done();
    });
  });

  it('should redirect to /login if user is not logged in', function (done) {
    const reqMock = {
      session: {
        user: 'testUser',
        loggedIn: false,
      },
    };
    const resMock = {
      redirect: (to) => {
        expect(to).to.be.eql('/login');
        done();
      },
    };

    const middleware = authMW({});
    middleware(reqMock, resMock, (err) => {
      expect(true, 'Next not called').to.be.eql(false);
      expect(err).to.be.undefined;
      done();
    });
  });

  it('should call next, if user is logged in', function (done) {
    const reqMock = {
      session: {
        user: 'testUser',
        loggedIn: true,
      },
    };
    let redirectCalled = false;
    const resMock = {
      redirect: () => {
        redirectCalled = true;
      },
    };

    const middleware = authMW({});
    middleware(reqMock, resMock, (err) => {
      expect(err).to.be.undefined;
    });

    expect(redirectCalled, 'Redirect called').to.be.false;
    done();
  });
});
