const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');
Joi.objectId = require('joi-objectid')(Joi);

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Неверный URL');
  }
  return value;
};

const validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validatePatchUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(urlValidation).required(),
    trailer: Joi.string().custom(urlValidation).required(),
    thumbnail: Joi.string().custom(urlValidation).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().required(),
  }),
});

module.exports = {
  validateId,
  validateSignUp,
  validatePatchUser,
  validateLogin,
  validateMovies,
};
