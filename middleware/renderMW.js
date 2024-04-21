/**
 * Using the template engine render the values into the template
 */
module.exports = function (objectrepository, viewName) {
  return function (req, res) {
    req.res.render(viewName, res.locals);
  };
};
