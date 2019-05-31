const jwt = require('jsonwebtoken');
const { publicKey } = require('../config');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || authHeader === '') {
    res.sendStatus(401);
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    jwt.verify(token, publicKey);
    next();
  } catch (error) {
    res.status(400).send(error.message);
    return false;
  }
};

module.exports = {
  authMiddleware
};
