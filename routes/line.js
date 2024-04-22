const renderMW = require('../middleware/renderMW');
const getMA01EnabledListMW = require('../middleware/ma01/getMA01EnabledListMW');
const getMA02EnabledListMW = require('../middleware/ma02/getMA02EnabledListMW');
const saveLineMW = require('../middleware/line/saveLineMW');

const LineModel = require('../models/line');
const MA01Model = require('../models/ma01');
const MA02Model = require('../models/ma02');

module.exports = function (app) {
  let objectRepository = {
    LineModel: LineModel,
    MA01Model: MA01Model,
    MA02Model: MA02Model,
  };

  app.use(
    '/line/new',
    getMA01EnabledListMW(objectRepository),
    getMA02EnabledListMW(objectRepository),
    saveLineMW(objectRepository),
    renderMW(objectRepository, 'lineEdit'),
  );

  app.use('/line/edit', renderMW(objectRepository, 'lineEdit'));

  app.use('/line', renderMW(objectRepository, 'line'));

  app.get('/', function (req, res, next) {
    res.redirect('/line');
  });
};
