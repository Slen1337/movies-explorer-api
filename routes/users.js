const user = require('express').Router();
const { getUser, patchUser } = require('../controllers/users');
const { validatePatchUser } = require('../middlewares/validation');

user.get('/users/me', getUser);
user.patch('/users/me', validatePatchUser, patchUser);

module.exports = user;
