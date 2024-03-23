const renderMW = require('../middleware/renderMW');

module.exports = function (app) {
  let objectRepository = {};

  app.use('/ma01/new', renderMW(objectRepository, 'ma01Edit'));

  app.use('/ma01/edit', renderMW(objectRepository, 'ma01Edit'));

  app.use('/ma01/details', renderMW(objectRepository, 'ma01Details'));

  app.use('/ma01', renderMW(objectRepository, 'ma01'));
};
