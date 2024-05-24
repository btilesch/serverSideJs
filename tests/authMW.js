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
      },
    };

    let nextCalled = false;
    const middleware = authMW({});
    middleware(reqMock, resMock, (err) => {
      nextCalled = true;
      expect(err).to.be.undefined;
    });

    expect(nextCalled, 'Next called').to.be.false;
    done();
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
      },
    };

    let nextCalled = false;
    const middleware = authMW({});
    middleware(reqMock, resMock, (err) => {
      nextCalled = true;
      expect(err).to.be.undefined;
    });

    expect(nextCalled, 'Next called').to.be.false;
    done();
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

    let nextCalled = false;
    const middleware = authMW({});
    middleware(reqMock, resMock, (err) => {
      nextCalled = true;
      expect(err).to.be.undefined;
    });

    expect(nextCalled, 'Next called').to.be.true;
    expect(redirectCalled, 'Redirect called').to.be.false;
    done();
  });
});
