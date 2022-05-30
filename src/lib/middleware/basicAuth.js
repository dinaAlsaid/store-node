'use strict';
const base64 = require('base-64');
const userCollection = require('../services/authentication/models/user.collection');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('invalid login');
  } else {
    const encodedUserInfo = req.headers.authorization.split(' ').pop();
    const decoded = base64.decode(encodedUserInfo);

    const [username, password] = decoded.split(':');

    userCollection
      .authenticate(username, password)
      .then((validUser) => {
        req.token = userCollection.generateToken(validUser);
        next();
      })
      .catch(() => next('Invalid Login'));
  }
};
