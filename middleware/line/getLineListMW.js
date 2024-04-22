const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
  const LineModel = requireOption(objectrepository, 'LineModel');

  return function (req, res, next) {
    res.locals.ma02List = LineModel.find({})
      .then(() => {
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
