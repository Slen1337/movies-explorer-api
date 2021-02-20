const router = require('express').Router();
const { createUser, login, signout } = require('../controllers/users');
const { validateSignUp, validateLogin } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const user = require('./users');
const movies = require('./movies');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateLogin, login);
router.get('/signout', auth, signout);

router.use(auth, user);
router.use(auth, movies);

module.exports = router;
