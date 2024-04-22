const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const MA01Model = requireOption(objectrepository, 'MA01Model');

  return function (req, res, next) {
    MA01Model.findOne({ _id: req.params.ma01Id })
      .then((ma01) => {
        if (!ma01) {
          return next(createHttpError(404, `Recipe ${req.params.ma01Id} not found`));
        }

        res.locals.ma01 = ma01;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
