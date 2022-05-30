const mongoose = require('mongoose');

const user = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    AccountType: { type: String, required: true, enum: ['Seller', 'Shopper'] },

});
const storeDB = mongoose.connection.useDb('store');
module.exports = storeDB.model('user', user);