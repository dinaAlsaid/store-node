"use strict";

const express = require("express");
const bearerAuthMW = require("../middleware/bearer");
const RBAuthMW = require("../middleware/RBA");

const router = express.Router();

//#region ENDPOINTS ----------------
router.post("/", bearerAuthMW, RBAuthMW, testhandler);
router.get("/", bearerAuthMW, RBAuthMW, testhandler);
router.put("/", bearerAuthMW, RBAuthMW, testhandler);

//#endregion

//#region HANDLERS ----------------
function testhandler(req, res) {
  res.status(200);
  res.json({ data: req.method });
}

function signinHandler(req, res) {
  res.json({ token: req.token });
}
//#endregion

module.exports = router;
