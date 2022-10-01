const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
require('dotenv').config();

// module.exports.auth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;

//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     next(new UnauthorizedError('Токен не найден'));
//   }

//   req.user = payload;
//   next();
// };

require('dotenv').config();

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  let payload;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Ошибка авторизации'));
  } else {
    const token = authorization.replace('Bearer ', '');

    try {
      payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
    } catch (err) {
      next(new UnauthorizedError('Ошибка авторизации'));
    }
  }
  next();
};

module.exports = auth;
