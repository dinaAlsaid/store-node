'use strict';
//basic methods for mostly all the models
//if a method is not suitable for use it can be overridden in the child collection 
class Collection {
  constructor(schemaName) {
    this.Model = schemaName;
  }
  read(_id) {
    //if id exist find by id if not find all
    let id = _id ? { _id } : {};
    return this.Model.find(id);
  }
  create(record) {
    const newRec = new this.Model(record);
    return newRec.save();
  }
  update(record) {
    return this.Model.findOneAndUpdate(record.id, record, { new: true });
  }
  delete(_id) {
    return this.Model.findOneAndDelete(_id);
  }
}

module.exports = Collection;
