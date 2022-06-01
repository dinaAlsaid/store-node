"use strict";

const express = require("express");
const bearerAuthMW = require("../middleware/bearer");
const RBAuthMW = require("../middleware/RBA");
const Order = require("../models/order/order.collection");

const router = express.Router();

//#region ENDPOINTS ----------------
router.post("/", bearerAuthMW, RBAuthMW, createOrderHandler);
router.get("/", bearerAuthMW, RBAuthMW, getAllOrdersHandler); //for user or for store
router.get("/:id", bearerAuthMW, RBAuthMW, getOrderHandler);
router.patch("/:id", bearerAuthMW, RBAuthMW, editOrderHandler); //to add products to the cart
router.delete("/:id", bearerAuthMW, RBAuthMW, deleteOrderHandler);
router.get("/cart", bearerAuthMW, RBAuthMW, getCartHandler);

//#endregion
//#region HANDLERS ----------------
function createOrderHandler(req, res) {
  Order.create(req.user)
    .then((data) => {
      res.status(201);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

function getAllOrdersHandler(req, res) {
  Order.read(req.user)
    .then((data) => {
      res.status(200);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

function getOrderHandler(req, res) {
  Order.read(req.params.id)
    .then((data) => {
      res.status(200);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

function getCartHandler(req, res) {
  Order.getCart(req.user)
    .then((data) => {
      res.status(200);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

function deleteOrderHandler(req, res) {
  Order.delete(req.params.id)
    .then((data) => {
      res.status(200);
      res.json({ data });
    })
    .catch((message) => {
      res.status(500);
      res.json({ message: message });
    });
}

function editOrderHandler(req, res) {
  Order.update(req.params.id, req.body)
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
