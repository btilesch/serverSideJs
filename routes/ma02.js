const renderMW = require('../middleware/renderMW');

module.exports = function (app) {
  let objectRepository = {};

  app.get('/ma02/new', renderMW(objectRepository, 'ma02Edit'));
  app.post('/ma02/new', renderMW(objectRepository, 'ma02'));

  app.get('/ma02/edit', renderMW(objectRepository, 'ma02Edit'));
  app.use('/ma02/edit', renderMW(objectRepository, 'ma02'));

  app.use('/ma02/details', renderMW(objectRepository, 'ma02Details'));
  app.use('/ma02/details', renderMW(objectRepository, 'ma02Details'));

  app.use('/ma02', renderMW(objectRepository, 'ma02'));
};
