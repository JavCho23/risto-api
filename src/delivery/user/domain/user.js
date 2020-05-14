
class User {
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
  toJson() {
    return {
      idUser: this._id.value,
      name: this._name.value,
      email: this._email.value,
    };
  }
}

module.exports = User;
