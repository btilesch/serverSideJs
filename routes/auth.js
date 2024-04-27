const renderMW = require('../middleware/renderMW');
const loginMW = require('../middleware/auth/loginMW');
const logoutMW = require('../middleware/auth/logoutMW');

module.exports = function (app) {
  let objectRepository = {};

  app.use('/login', loginMW(objectRepository), renderMW(objectRepository, 'login'));

  app.use('/logout', logoutMW(objectRepository));
};
