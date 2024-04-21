const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  return async function (req, res, next) {
    if (typeof res.locals.ma01 === 'undefined') {
      return next(createHttpError(404, 'Recipe not found'));
    }

    res.locals.ma01.enabled = true;
    try {
      const saved = await res.locals.ma01.save();

      if (saved !== res.locals.ma01) {
        return next(createHttpError(500, 'The save operation was unsuccessful'));
      }
    } catch (err) {
      return next(err);
    }
    return res.redirect('/ma01');
  };
};
