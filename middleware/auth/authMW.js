module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof req.session.user === 'undefined' || req.session.loggedIn !== true) {
      return res.redirect('/login');
    }

    next();
  };
};
