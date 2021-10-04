const cors = require("cors");
const ApiError = require("../errors/api-errors");
const whitelist = new Set([
  "http://localhost:3000",
  process.env.WHITELISTED_URL,
]);
//is set faster ??

const corOptions = {
  optionsSuccessStatus: 200,
  origin: function (origin, callback) {
    // db.loadOrigins is an example call to load
    // a list of origins from a backing database
    if (whitelist.has(origin)) {
      callback(null, true);
    } else {
      callback(ApiError.unauthorized("blocked by cors"));
    }
    // db.loadOrigins(function (error, origins) {
    //     callback(error, origins)
    // })
  },
  credentials: true,
};

module.exports = cors(corOptions);
