const renderMW = require('../middleware/renderMW');

module.exports = function (app) {
  let objectRepository = {};

  app.get('/login', renderMW(objectRepository, 'login'));
};
