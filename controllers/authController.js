/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
