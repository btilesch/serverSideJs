const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const MA01Model = requireOption(objectrepository, 'MA01Model');

  return async function (req, res, next) {
    try {
      const result = await MA01Model.deleteOne({ _id: req.params.ma01Id });

      if (result.deletedCount !== 1) {
        return next(createHttpError(500, 'The delete operation was unsuccessful'));
      }

      return res.redirect('/ma01');
    } catch (err) {
      return next(err);
    }
  };
};
