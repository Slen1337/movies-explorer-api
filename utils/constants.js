const validationError = 'Указаны некорректные данные:';
const conflictError = 'Пользователь с таким email уже существует';
const forbiddenError = 'Нет прав для данной операции';
const userNotFound = 'Такого пользователя не существует';
const movieNotFound = 'Не удалось найти фильм';
const invalidMovieAction = 'Нельзя удалить фильм другого пользователя';
const unauthorized = 'Необходимо авторизироваться';
const notValidUserData = 'Неправильные почта или пароль';
const succsess = 'Успешная авторизация';
const limiterError = 'Чумба ты совсем? Уже 250 запросов с IP отправил, попробуй позже';

module.exports = {
  validationError,
  conflictError,
  forbiddenError,
  userNotFound,
  movieNotFound,
  unauthorized,
  succsess,
  limiterError,
  notValidUserData,
  invalidMovieAction,
};
