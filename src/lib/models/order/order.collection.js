"use strict";

const Schema = require("./orderSchema");
const storeModel = require("../store/storeSchema");

class StoreCollection {
  constructor() {
    this.Model = Schema;
  }

  async create(user) {
    try {
      let record;
      record.user = user._id;

      const newRec = new this.Model(record).save();
      if (newRec) {
        return Promise.resolve(newRec);
      }
    } catch (err) {
      return Promise.reject();
    }
  }

  read(user) {
    if (user.AccoutnType === "Shopper") {
      return Promise.resolve(this.Model.find({ user: user._id }));
    } else if (user.AccoutnType === "Seller") {
      let storeName = storeModel.find({ user: user._id });
      return Promise.resolve(this.Model.find({ store: storeName }));
    } else {
      return Promise.resolve(this.Model.find({}));
    }
  }
  async getCart(user) {
    try {
      let record = await this.Model.find({ _id: user._id, status: "processing" });

      if (record[0]) {
        return Promise.resolve(record[0]);
      } else {
        return Promise.resolve(this.create(user));
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async update(id, reqBody) {
    let record = await this.Model.find({ _id: id });

    if (record) {
      record = { ...record, ...reqBody };
      const newRec = await this.Model.findOneAndUpdate(record._id, record, { new: true });
      return Promise.resolve(newRec);
    } else {
      return Promise.reject("can not find record");
    }
  }
  delete(_id) {
    return this.Model.findOneAndDelete(_id);
  }
}

module.exports = new StoreCollection();
