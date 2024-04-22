const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
  const MA01Model = requireOption(objectrepository, 'MA01Model');

  return function (req, res, next) {
    MA01Model.find({})
      .then((list) => {
        res.locals.ma01List = list;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
