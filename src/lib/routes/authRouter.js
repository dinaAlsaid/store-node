"use strict";

const express = require("express");
const basicAuthMW = require("../middleware/basicAuth");
const user = require("../models/user/user.collection");

const router = express.Router();

//#region ENDPOINTS ----------------
router.post("/signup", signupHandler);
router.post("/signin", basicAuthMW, signinHandler);

//#endregion

//#region HANDLERS ----------------
function signupHandler(req, res) {
  user
    .createHash(req.body)
    .then(async (data) => {
      const token = await user.generateToken(data);
      res.status(201);
      res.json({ token, data });
    })
    .catch((err) => {
      res.status(500);
      res.json({ message: err.message });
    });
}

function signinHandler(req, res) {
  res.json({ token: req.token });
}
//#endregion

module.exports = router;
