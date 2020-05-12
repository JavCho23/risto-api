const RawString = require("../../../../shared/domain/value/raw_string");
const RawDouble = require("../../../../shared/domain/value/raw_double");
const Uuid = require("../../../../shared/domain/value/uuid");
class Product {
  constructor(idProduct, name, price) {
    this._id = idProduct;
    this._name = name;
    this._price = price;
  }
  static fromJson(item) {
    return new this(
      new Uuid(item.idProduct),
      new RawString(item.name),
      new RawDouble(item.price)
    );
  }
  get idProduct() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  get price(){
    return this._price;
  }
  toJson() {
    return {
      idProduct: this._id.value,
      name: this._name.value,
      price: this._price.value,
    };
  }
}

module.exports = Product;
