const RawString = require("../../../shared/domain/value/raw_string");

class Personal {
  constructor(id, name, email) {
    this._id = id;
    this._name = name;
    this._email = email;
  }
  get idManager() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  static fromJson(personal) {
    return new this(
      new RawString(personal.idManager),
      new RawString(personal.name),
      new RawString(personal.email)
    );
  }
  toJson() {
    return {
      idManager: this._id.value,
      name: this._name.value,
      email: this._email.value,
    };
  }
}

module.exports = Personal;
