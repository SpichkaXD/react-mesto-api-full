const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  // const token = req.cookies.jwt;
  let payload;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Ошибка авторизации'));
  } else {
    const token = authorization.replace('Bearer ', '');

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new UnauthorizedError('Токен не найден'));
    }

    req.user = payload;
  }
  next();
};
