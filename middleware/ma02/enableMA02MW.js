const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof res.locals.ma02 === 'undefined') {
      return next(createHttpError(404, 'Recipe not found'));
    }

    res.locals.ma02.enabled = true;

    res.locals.ma02
      .save()
      .then((saved) => {
        if (saved !== res.locals.ma02) {
          return next(createHttpError(500, 'The save operation was unsuccessful'));
        }
        return res.redirect('/ma02');
      })
      .catch((err) => {
        return next(err);
      });
  };
};
