const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const MA01Model = requireOption(objectrepository, 'MA01Model');

  return function (req, res, next) {
    if (
      typeof req.body.name === 'undefined' ||
      typeof req.body.tempLow === 'undefined' ||
      typeof req.body.tempHigh === 'undefined' ||
      typeof req.body.powerMax === 'undefined'
    ) {
      return next();
    }

    if (typeof res.locals.ma01 === 'undefined') {
      res.locals.ma01 = new MA01Model();
    }

    res.locals.ma01.name = req.body.name;
    res.locals.ma01.enabled = req.body.enabled ?? false;
    res.locals.ma01.creationDate = Date.now();
    res.locals.ma01.username = 'Unknown'; //TODO: read from session
    res.locals.ma01.tempLow = req.body.tempLow;
    res.locals.ma01.tempHigh = req.body.tempHigh;
    res.locals.ma01.powerMax = req.body.powerMax;

    res.locals.ma01
      .save()
      .then((saved) => {
        if (saved !== res.locals.ma01) {
          return next(createHttpError(500, 'The save operation was unsuccessful'));
        }

        return res.redirect('/ma01');
      })
      .catch((err) => {
        next(err);
      });
  };
};
