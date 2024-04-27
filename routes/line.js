const renderMW = require('../middleware/renderMW');
const getMA01EnabledListMW = require('../middleware/ma01/getMA01EnabledListMW');
const getMA02EnabledListMW = require('../middleware/ma02/getMA02EnabledListMW');
const saveLineMW = require('../middleware/line/saveLineMW');
const getLineListMW = require('../middleware/line/getLineListMW');
const getLineMW = require('../middleware/line/getLineMW');
const deleteLineMW = require('../middleware/line/deleteLineMW');
const enableLineMW = require('../middleware/line/enableLineMW');
const authMW = require('../middleware/auth/authMW');

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
    authMW(objectRepository),
    getMA01EnabledListMW(objectRepository),
    getMA02EnabledListMW(objectRepository),
    saveLineMW(objectRepository),
    renderMW(objectRepository, 'lineEdit'),
  );

  app.use(
    '/line/edit/:lineId',
    authMW(objectRepository),
    getMA01EnabledListMW(objectRepository),
    getMA02EnabledListMW(objectRepository),
    getLineMW(objectRepository),
    saveLineMW(objectRepository),
    renderMW(objectRepository, 'lineEdit'),
  );
  app.use('/line/delete/:lineId', authMW(objectRepository), deleteLineMW(objectRepository));

  app.use(
    '/line/enable/:lineId',
    authMW(objectRepository),
    getLineMW(objectRepository),
    enableLineMW(objectRepository),
    renderMW(objectRepository, 'ma01'),
  );

  app.use('/line', getLineListMW(objectRepository), renderMW(objectRepository, 'line'));

  //app.use('/', function (req, res, next) {
  //res.redirect('/line');
  //});
};
