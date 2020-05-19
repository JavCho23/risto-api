const Uuid = require("../../../shared/domain/value/uuid");
const RawString = require("../../../shared/domain//value/raw_string");

class User {
  constructor(dataUser) {
    this._id = new RawString(dataUser.idUser);
    this._email = new RawString(dataUser.email);
    this._name = new RawString(dataUser.name);
    this._application = new RawString(dataUser.aplication);
  }
  get idUser() {
    return this._id;
  }
  get email() {
    return this._email;
  }
  get name() {
    return this._name;
  }

  get aplication() {
    return this._application;
  }
}

module.exports = User;
