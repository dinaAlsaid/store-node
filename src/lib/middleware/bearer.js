"use strict";

const userCollection = require("../models/user/user.collection");

module.exports = (req, res, next) => {
  //checks for token
  if (!req.headers.authorization) {
    next("UnAuthorized");
  } else {
    const token = req.headers.authorization.split(" ").pop();
    userCollection
      .authenticateJWT(token)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch(() => {
        next("unAuthorized");
      });
  }
};
