const movies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateId, validateMovies } = require('../middlewares/validation');

movies.get('/movies', getMovies);
movies.post('/movies', validateMovies, createMovie);
movies.delete('/movies/:movieId', validateId, deleteMovie);

module.exports = movies;
