const Product = require("../../product/domain/product");
const RawString = require("../../../../shared/domain/value/raw_string");
const RawDouble = require("../../../../shared/domain/value/raw_double");
const RawBool = require("../../../../shared/domain/value/raw_bool");
const Uuid = require("../../../../shared/domain/value/uuid");
class Item {
  constructor(
    idItem,
    name,
    description,
    local,
    idLocal,
    score,
    aviable,
    city,
    tags,
    products
  ) {
    this._id = idItem;
    this._name = name;
    this._description = description;
    this._local = local;
    this._idLocal = idLocal;
    this._score = score;
    this._aviable = aviable;
    this._city = city;
    this._tags = tags;
    this._products = products;
  }
  static fromJson(item) {
    return new this(
      new Uuid(item.idItem),
      new RawString(item.name),
      new RawString(item.description),
      new RawString(''),
      new RawString(''),
      new RawDouble(0),
      new RawBool(0),
      new RawString(''),
      item.tags.map((tag) => new RawString(tag)),
      item.products.map((product) => Product.fromJson(product))
    );
  }
  get idItem() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  get tags(){
    return this._tags;
  }
  get description(){
    return this._description;
  }
  get products(){
    return this._products;
  }
  toJson() {
    return {
      idItem: this._id.value,
      name: this._name.value,
      description: this._description.value,
      local: this._local.value,
      idLocal: this._idLocal.value,
      score: this._score.value,
      isAvialable: this._aviable.value,
      tags: this._tags.map((tag) => tag.name.value),
      products: this._products.map((product) => product.toJson()),
    };
  }
}

module.exports = Item;
