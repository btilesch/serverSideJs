const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const MA02Model = requireOption(objectrepository, 'MA02Model');

  return function (req, res, next) {
    if (
      typeof req.body.name === 'undefined' ||
      typeof req.body.pressureA === 'undefined' ||
      typeof req.body.pressureB === 'undefined' ||
      typeof req.body.pressureAlm === 'undefined'
    ) {
      return next();
    }

    if (typeof res.locals.ma02 === 'undefined') {
      res.locals.ma02 = new MA02Model();
    }

    res.locals.ma02.name = req.body.name;
    res.locals.ma02.enabled = req.body.enabled ?? false;
    res.locals.ma02.creationDate = Date.now();
    res.locals.ma02.username = 'Unknown'; //TODO: read from session
    res.locals.ma02.pressureA = req.body.pressureA;
    res.locals.ma02.pressureB = req.body.pressureB;
    res.locals.ma02.pressureAlm = req.body.pressureAlm;

    res.locals.ma02
      .save()
      .then((saved) => {
        if (saved !== res.locals.ma02) {
          return next(createHttpError(500, 'The save operation was unsuccessful'));
        }

        return res.redirect('/ma02');
      })
      .catch((err) => {
        next(err);
      });
  };
};
