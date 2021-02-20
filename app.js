const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');
const limiter = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error');

const { PORT, MONGODB_URL = 'mongodb://localhost:27017/movies-explorerdb' } = require('./utils/config');

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const CORS_CONFIG = {
  origin: ['http://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'Authorization',
  ],
  credentials: true,
};

app.use(requestLogger);
app.use('*', cors(CORS_CONFIG));
app.use('/', router);
app.use(errorLogger);
app.use(errors());

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
