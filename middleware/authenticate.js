//plug in another middleware the will check if the user is logged in or not
//all requests that are plugged in after this middleware will only be accessible if the user is logged in
const ApiError = require("../errors/api-errors");
function authenticate(req, res, next) {
  if (!req.session || !req.session.user) {
    next(ApiError.unauthorized("something went wrong"));
  }
  next();
}

module.exports = authenticate;
