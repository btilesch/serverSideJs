const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
  const MA01Model = requireOption(objectrepository, 'MA01Model');

  return async function (req, res, next) {
    try {
      res.locals.ma01List = await MA01Model.find({});
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
