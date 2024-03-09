const renderMW = require('../middleware/render');

module.exports = function (app) {
  let objectRepository = {};

  app.use('/ma01/new', renderMW(objectRepository, 'ma01_edit'));

  app.use('/ma01/edit', renderMW(objectRepository, 'ma01_edit'));

  app.use('/ma01/details', renderMW(objectRepository, 'ma01_details'));

  app.use('/ma01', renderMW(objectRepository, 'ma01'));
};
