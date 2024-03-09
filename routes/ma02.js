const renderMW = require('../middleware/render');

module.exports = function (app) {
  let objectRepository = {};

  app.use('/ma02/new', renderMW(objectRepository, 'ma02_edit'));

  app.use('/ma02/edit', renderMW(objectRepository, 'ma02_edit'));

  app.use('/ma02/details', renderMW(objectRepository, 'ma02_details'));

  app.use('/ma02', renderMW(objectRepository, 'ma02'));
};
