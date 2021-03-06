"use strict";

const Schema = require("./storeSchema");

class StoreCollection {
  constructor() {
    this.Model = Schema;
  }

  async create(record, user) {
    let exists = await this.Model.find({ user: user._id });
    record.user = user._id;
    if (exists[0]) {
      return Promise.reject("user already created a store");
    } else {
      record.user = user._id;
      const newRec = new this.Model(record).save();
      if (newRec) {
        return Promise.resolve(newRec);
      }
    }
  }

  read(_id) {
    //if id exist find by id if not find all
    let id = _id ? { _id } : {};
    return this.Model.find(id);
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
