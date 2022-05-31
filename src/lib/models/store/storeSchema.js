const mongoose = require("mongoose");
const productSchema= require("../product/productSchema").schema;

const store = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false, default: " " },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  products: { type: [productSchema], required: true },
});

const storeDB = mongoose.connection.useDb("store");
module.exports = storeDB.model("store", store);
