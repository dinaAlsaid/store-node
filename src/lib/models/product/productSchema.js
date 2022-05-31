const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
  },
  {
    _id: false,
  },
);
const storeDB = mongoose.connection.useDb("store");

module.exports = { model: storeDB.model("product", productSchema), schema: productSchema };
