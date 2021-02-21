const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const { validationError, invalidMovieAction, movieNotFound } = require('../utils/constants');
const Movie = require('../models/movie');

const createMovie = (req, res, next) => {
  const
    {
      movieId,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
    } = req.body;

  Movie.create(
    {
      movieId,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      owner: req.user._id,
    },
  )
    .then((movie) => {
      if (!movie) {
        throw new ValidationError(validationError);
      }
      return res.send(movie);
    })
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFound);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(invalidMovieAction);
      }
      return Movie.findByIdAndDelete(req.params.movieId);
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
