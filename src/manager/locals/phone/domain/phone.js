const RawString = require("../../../../shared/domain/value/raw_string");

class Phone {
  constructor(id, label, number) {
    this._id = id;
    this._label = label;
    this._number = number;
  }
  get idPhone() {
    return this._id;
  }
  get label() {
    return this._label;
  }
  get number() {
    return this._number;
  }
  static fromJson(phone) {
    return new this(
      new RawString(phone.idPhone),
      new RawString(phone.label),
      new RawString(phone.number)
    );
  }
  toJson() {
    return {
      idPhone: this._id.value,
      label: this._label.value,
      number: this._number.value,
    };
  }
}

module.exports = Phone;
