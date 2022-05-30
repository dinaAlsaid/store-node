const mongoose = require("mongoose");

const product = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    store: { type: String,  required: false },

  },
  {
    _id: false,
  }
);
const storeDB = mongoose.connection.useDb("store");
module.exports = storeDB.model("product", product);
