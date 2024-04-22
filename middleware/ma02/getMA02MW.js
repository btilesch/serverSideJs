const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const MA02Model = requireOption(objectrepository, 'MA02Model');

  return function (req, res, next) {
    MA02Model.findOne({ _id: req.params.ma02Id })
      .then((ma02) => {
        if (!ma02) {
          return next(createHttpError(404, `Recipe ${req.params.ma02Id} not found`));
        }

        res.locals.ma02 = ma02;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
