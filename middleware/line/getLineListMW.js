const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
  const LineModel = requireOption(objectrepository, 'LineModel');

  return function (req, res, next) {
    res.locals.lineList = LineModel.find({})
      .populate('_ma01')
      .populate('_ma02')
      .then((list) => {
        res.locals.lineList = list;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
