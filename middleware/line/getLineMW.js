const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const LineModel = requireOption(objectrepository, 'LineModel');

  return function (req, res, next) {
    LineModel.findOne({ _id: req.params.lineId })
      .then((line) => {
        if (!line) {
          return next(createHttpError(404, `Recipe ${req.params.lineId} not found`));
        }

        res.locals.line = line;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
