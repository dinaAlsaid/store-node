"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./userSchema");
const SECRET = process.env.SECRET;

class userCollection {
  constructor() {
    this.Model = UserModel;
    this.editPermissions = {
      Seller: ["/store"], //endpoints where this account type can edit (POST,PUT,DELETE)
      Shopper: ["/order"],
    };
  }
  /* encrypts the password then creates a new user record  */
  async createHash(record) {
    try {
      record.password = await bcrypt.hash(record.password, 5);
      const newRec = new this.Model(record);
      return newRec.save();
    } catch (err) {
      return err.messsage;
    }
  }

  generateToken(user) {
    try {
      const token = jwt.sign({ username: user.username }, SECRET);
      return token;
    } catch (err) {
      return err.message;
    }
  }

  async findUser(username) {
    try {
      let results = await this.Model.findOne({ username });
      return results;
    } catch (err) {
      return err.message;
    }
  }

  async authenticateJWT(token) {
    try {
      //find user obj from token
      const tokenObj = jwt.verify(token, SECRET);
      let user = await this.Model.findOne({ username: tokenObj.username });
      if (user) {
        return Promise.resolve(user);
      } else {
        return Promise.reject();
      }
    } catch (err) {
      return err.message;
    }
  }

  async authenticate(username, password) {
    try {
      let record = await this.Model.find({ username });
      if (record.length !== 0) {
        const valid = await bcrypt.compare(password, record[0].password);
        if (!valid) {
          return Promise.reject();
        } else {
          return Promise.resolve(record[0]);
        }
      } else {
        return Promise.reject();
      }
    } catch (err) {
      return err.messsage;
    }
  }

  async rba(req) {
    let role = req.user.AccountType;
    console.log(req.baseUrl);

    if (req.method === "GET") {
      return Promise.resolve();
    } else {
      if (this.editPermissions[role].includes(req.baseUrl)) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }
  }
}

module.exports = new userCollection();
