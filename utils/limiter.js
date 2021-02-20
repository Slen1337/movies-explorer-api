const rateLimit = require('express-rate-limit');
const { limiterError } = require('./constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 250,
  message: limiterError,
});

module.exports = limiter;
