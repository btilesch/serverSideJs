const renderMW = require('../middleware/render');

module.exports = function (app) {
  let objectRepository = {};

  app.get('/', function (req, res, next) {
    res.redirect('/line');
  });

  app.use('/line/new', renderMW(objectRepository, 'line_edit'));

  app.use('/line/edit', renderMW(objectRepository, 'line_edit'));

  app.use('/line', renderMW(objectRepository, 'line'));
};
