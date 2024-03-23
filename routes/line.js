const renderMW = require('../middleware/renderMW');

module.exports = function (app) {
  let objectRepository = {};

  app.get('/', function (req, res, next) {
    res.redirect('/line');
  });

  app.use('/line/new', renderMW(objectRepository, 'lineEdit'));

  app.use('/line/edit', renderMW(objectRepository, 'lineEdit'));

  app.use('/line', renderMW(objectRepository, 'line'));
};
