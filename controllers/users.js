const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const { conflictError, userNotFound, validationError } = require('../utils/constants');
const User = require('../models/user');

const { JWT_SECRET } = require('../utils/config');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError') {
        throw new ConflictError(conflictError);
      } else next(err);
    })
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 300000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({
          email: user.email, name: user.name, token,
        });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFound);
      }
      res.send(user);
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new ValidationError(validationError);
      }
      res.send(user);
    })
    .catch(next);
};

const signout = (req, res) => {
  res
    .clearCookie('jwt', { httpOnly: true, sameSite: true })
    .send({ message: 'Выйти' });
};

module.exports = {
  createUser,
  login,
  getUser,
  patchUser,
  signout,
};
