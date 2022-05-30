const mongoose = require("mongoose");

const order = mongoose.Schema({
  orderNumber: { type: Number, required: true, unique: true },
  date: { type: Date, required: true },
  status: { type: String, required: true, enum: ["processing", "shipped"], default: "processing" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  products: { type: [Object], required: true },
});

const storeDB = mongoose.connection.useDb("store");
module.exports = storeDB.model("order", order);
