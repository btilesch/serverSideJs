const renderMW = require('../middleware/renderMW');
const saveMA01MW = require('../middleware/ma01/saveMA01MW');
const getMA01ListMW = require('../middleware/ma01/getMA01ListMW');
const getMA01MW = require('../middleware/ma01/getMA01MW');
const deleteMA01MW = require('../middleware/ma01/deleteMA01MW');
const enableMA01MW = require('../middleware/ma01/enableMA01MW');

const MA01Model = require('../models/ma01');
const LineModel = require('../models/line');
const authMW = require('../middleware/auth/authMW');

module.exports = function (app) {
  let objectRepository = {
    MA01Model: MA01Model,
    LineModel: LineModel,
  };

  app.use('/ma01/new', authMW(objectRepository), saveMA01MW(objectRepository), renderMW(objectRepository, 'ma01Edit'));

  app.use(
    '/ma01/edit/:ma01Id',
    authMW(objectRepository),
    getMA01MW(objectRepository),
    saveMA01MW(objectRepository),
    renderMW(objectRepository, 'ma01Edit'),
  );

  app.use('/ma01/delete/:ma01Id', authMW(objectRepository), deleteMA01MW(objectRepository));

  app.use(
    '/ma01/enable/:ma01Id',
    authMW(objectRepository),
    getMA01MW(objectRepository),
    enableMA01MW(objectRepository),
    renderMW(objectRepository, 'ma01'),
  );

  app.use(
    '/ma01/:ma01Id',
    authMW(objectRepository),
    getMA01MW(objectRepository),
    renderMW(objectRepository, 'ma01Details'),
  );

  app.use('/ma01', getMA01ListMW(objectRepository), renderMW(objectRepository, 'ma01'));
};
