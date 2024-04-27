module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof req.body.password === 'undefined' || typeof req.body.username === 'undefined') {
      return next();
    }

    if (req.body.password === '111') {
      req.session.regenerate((err) => {
        if (err) next(err);
      });

      req.session.loggedIn = true;
      req.session.user = req.body.username;

      req.session.save((err) => {
        if (err) return next(err);
      });

      return res.redirect('/line');
    }

    res.locals.error = 'Wrong password';
    return next();
  };
};
