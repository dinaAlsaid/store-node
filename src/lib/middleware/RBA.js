'use strict';

const userCollection = require('../models/user/user.collection');

module.exports = (req, res, next) => {
  //checks for user (from bearer auth middleware)
  if (!req.user) {
    next('UnAuthorized');
  } else {
    userCollection
      .rba(req)
      .then(() => {
        next();
      })
      .catch(() => {
        next('unAuthorized');
      });
  }
};
