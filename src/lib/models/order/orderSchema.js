const mongoose = require("mongoose");
const productSchema= require("../product/productSchema").schema;

const order = mongoose.Schema({
  date: { type: Date, required: false ,default: new Date()},
  status: { type: String, required: true, enum: ["processing", "shipped"], default: "processing" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  products: { type: [productSchema], required: true },
  store: { type: String, required: true },

});

const storeDB = mongoose.connection.useDb("store");
module.exports = storeDB.model("order", order);
