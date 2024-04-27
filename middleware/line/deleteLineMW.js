const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const LineModel = requireOption(objectrepository, 'LineModel');

  return function (req, res, next) {
    LineModel.deleteOne({ _id: req.params.lineId })
      .then((result) => {
        if (result.deletedCount !== 1) {
          return next(createHttpError(500, 'The delete operation was unsuccessful'));
        }
        return res.redirect('/line');
      })
      .catch((err) => {
        return next(err);
      });
  };
};
