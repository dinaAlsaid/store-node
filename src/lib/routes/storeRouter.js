"use strict";

const express = require("express");
const bearerAuthMW = require("../middleware/bearer");
const RBAuthMW = require("../middleware/RBA");
const Store = require("../models/store/store.collection");

const router = express.Router();

//#region ENDPOINTS ----------------
router.post("/", bearerAuthMW, RBAuthMW, createStoreHandler);
router.get("/", bearerAuthMW, RBAuthMW, getAllStoresHandler);
router.get("/:id", bearerAuthMW, RBAuthMW, getStoresHandler);
router.patch("/:id", bearerAuthMW, RBAuthMW, editStoreHandler);//to add products to the store
router.delete("/:id", bearerAuthMW, RBAuthMW, deleteStoreHandler);

//#endregion
//#region HANDLERS ----------------
function createStoreHandler(req, res) {
  Store.create(req.body, req.user)
    .then((data) => {
      res.status(201);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

function getAllStoresHandler(req, res) {
  Store.read()
    .then((data) => {
      res.status(200);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

function getStoresHandler(req, res) {
  Store.read(req.params.id)
    .then((data) => {
      res.status(200);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

function deleteStoreHandler(req, res) {
  Store.delete(req.params.id)
    .then((data) => {
      res.status(200);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

function editStoreHandler(req, res) {
  Store.update(req.params.id,req.body)
    .then((data) => {
      res.status(200);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

//#endregion

module.exports = router;
