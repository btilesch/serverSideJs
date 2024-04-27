const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof res.locals.line === 'undefined') {
      return next(createHttpError(404, 'Recipe not found'));
    }

    res.locals.line.enabled = true;
    res.locals.line
      .save()
      .then((saved) => {
        if (saved !== res.locals.line) {
          return next(createHttpError(500, 'The save operation was unsuccessful'));
        }
        return res.redirect('/line');
      })
      .catch((err) => {
        return next(err);
      });
  };
};
