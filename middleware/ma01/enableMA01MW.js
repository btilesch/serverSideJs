const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof res.locals.ma01 === 'undefined') {
      return next(createHttpError(404, 'Recipe not found'));
    }

    res.locals.ma01.enabled = true;

    res.locals.ma01
      .save()
      .then((saved) => {
        if (saved !== res.locals.ma01) {
          return next(createHttpError(500, 'The save operation was unsuccessful'));
        }
        return res.redirect('/ma01');
      })
      .catch((err) => {
        return next(err);
      });
  };
};
