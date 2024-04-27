const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const LineModel = requireOption(objectrepository, 'LineModel');
  const MA01Model = requireOption(objectrepository, 'MA01Model');
  const MA02Model = requireOption(objectrepository, 'MA02Model');

  return function (req, res, next) {
    if (
      typeof req.body.name === 'undefined' ||
      typeof req.body._ma01 === 'undefined' ||
      typeof req.body._ma02 === 'undefined'
    ) {
      return next();
    }

    if (typeof res.locals.line === 'undefined') {
      res.locals.line = new LineModel();
    }

    res.locals.line.name = req.body.name;
    res.locals.line.enabled = req.body.enabled ?? false;
    res.locals.line.creationDate = Date.now();
    res.locals.line.username = req.session.user ?? '';
    res.locals.line._ma01 = req.body._ma01;
    res.locals.line._ma02 = req.body._ma02;

    res.locals.line
      .save()
      .then((saved) => {
        if (saved !== res.locals.line) {
          return next(createHttpError(500, 'The save operation was unsuccessful'));
        }
        return res.redirect('/line');
      })
      .catch((err) => {
        next(err);
      });
  };
};
