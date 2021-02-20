const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { unauthorized } = require('../utils/constants');

const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(unauthorized);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError(unauthorized);
  }
  req.user = payload;
  return next();
};

module.exports = auth;
