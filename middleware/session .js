const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("../db/redis");
const RedisStore = connectRedis(session);

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: "sessionId",
  cookie: {
    secure: false, //if true only transmit https only
    httpOnly: true, //stops client side javascript
    maxAge: 1000 * 60 * 30, //session max age in milliseconds
  },
});
