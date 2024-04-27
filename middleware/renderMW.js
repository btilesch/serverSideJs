/**
 * Using the template engine render the values into the template
 */
module.exports = function (objectrepository, viewName) {
  return function (req, res) {
    //get username to display on the topnav
    if (typeof req.session.user !== 'undefined' || req.session.loggedIn === true) {
      res.locals.user = req.session.user;
    }

    req.res.render(viewName, res.locals);
  };
};
