const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Токен не найден'));
  }

  req.user = payload;
  next();
};
