const renderMW = require('../middleware/renderMW');
const saveMA02MW = require('../middleware/ma02/saveMA02MW');
const getMA02ListMW = require('../middleware/ma02/getMA02ListMW');
const getMA02MW = require('../middleware/ma02/getMA02MW');
const deleteMA02MW = require('../middleware/ma02/deleteMA02MW');
const enableMA02MW = require('../middleware/ma02/enableMA02MW');

const MA02Model = require('../models/ma02');

module.exports = function (app) {
  let objectRepository = {
    MA02Model: MA02Model,
  };

  app.use('/ma02/new', saveMA02MW(objectRepository), renderMW(objectRepository, 'ma02Edit'));

  app.use(
    '/ma02/edit/:ma02Id',
    getMA02MW(objectRepository),
    saveMA02MW(objectRepository),
    renderMW(objectRepository, 'ma02Edit'),
  );

  app.use('/ma02/delete/:ma02Id', deleteMA02MW(objectRepository));

  app.use(
    '/ma02/enable/:ma02Id',
    getMA02MW(objectRepository),
    enableMA02MW(objectRepository),
    renderMW(objectRepository, 'ma02'),
  );

  app.use('/ma02/:ma02Id', getMA02MW(objectRepository), renderMW(objectRepository, 'ma02Details'));

  app.use('/ma02', getMA02ListMW(objectRepository), renderMW(objectRepository, 'ma02'));
};
