const renderMW = require('../middleware/renderMW');
const saveMa01MW = require('../middleware/saveMa01MW');

const MA01Model = require('../models/ma01');

module.exports = function (app) {
  let objectRepository = {
    MA01Model: MA01Model,
  };

  app.use('/ma01/new', saveMa01MW(objectRepository), renderMW(objectRepository, 'ma01Edit'));

  app.use('/ma01/edit', saveMa01MW(objectRepository), renderMW(objectRepository, 'ma01Edit'));

  app.use('/ma01/details', renderMW(objectRepository, 'ma01Details'));

  app.use('/ma01', renderMW(objectRepository, 'ma01'));
};
