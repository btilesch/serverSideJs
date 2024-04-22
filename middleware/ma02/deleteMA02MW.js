const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const MA02Model = requireOption(objectrepository, 'MA02Model');

  return function (req, res, next) {
    MA02Model.deleteOne({ _id: req.params.ma02Id })
      .then((result) => {
        if (result.deletedCount !== 1) {
          return next(createHttpError(500, 'The delete operation was unsuccessful'));
        }
        return res.redirect('/ma02');
      })
      .catch((err) => {
        return next(err);
      });
  };
};
