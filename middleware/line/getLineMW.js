const requireOption = require('../requireOption');
const createHttpError = require('http-errors');

module.exports = function (objectrepository) {
  const LineModel = requireOption(objectrepository, 'LineModel');

  return function (req, res, next) {
    LineModel.findOne({ _id: req.params.lineId })
      .populate('_ma01')
      .populate('_ma02')
      .then((line) => {
        if (!line) {
          return next(createHttpError(404, `Recipe ${req.params.lineId} not found`));
        }

        res.locals.line = line;

        //makes it easier to set the selected dropdown option
        res.locals.ma01Id = line?._ma01?._id;
        let string1 = res.locals.ma01Id.toString();
        res.locals.ma02Id = line?._ma02?._id;
        let string2 = res.locals.ma02Id.toString();
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
