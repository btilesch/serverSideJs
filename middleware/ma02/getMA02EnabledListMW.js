const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
  const MA02Model = requireOption(objectrepository, 'MA02Model');

  return function (req, res, next) {
    MA02Model.find({ enabled: true })
      .then((list) => {
        res.locals.ma02List = list;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};
