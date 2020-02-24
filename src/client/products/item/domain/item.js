const ItemId = require("./value/item_id");
const ItemName = require("./value/item_name");
const ItemPrice = require("./value/item_price");
const ItemImage = require("./value/item_image");
const ItemDescription = require("./value/item_description");

class Item {
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._price = data.price;
    this._image = data.image;
    this._description = data.description;
  }

  toJson() {
    return {
      id: this._id.value,
      name: this._name.value,
      price: this._price.value,
      image: this._image.value,
      description: this._image.value
    };
  }
}

module.exports = Item;
