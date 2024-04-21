const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const MA01Model = requireOption(objectrepository, 'MA01Model');

  return async function (req, res, next) {
    try {
      const ma01 = await MA01Model.findOne({ _id: req.params.ma01Id });

      if (!ma01) {
        return next(createHttpError(404, `Recipe ${req.params.ma01Id} not found`));
      }

      res.locals.ma01 = ma01;
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
