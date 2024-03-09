const renderMW = require('../middleware/render');

module.exports = function (app) {
  let objectRepository = {};

  app.get('/login', renderMW(objectRepository, 'login'));
};
