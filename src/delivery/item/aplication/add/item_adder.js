const Item = require("../../domain/item");

class ItemAdder {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal, item, productAdder) {
    return this.repository.add(idLocal, Item.fromJson(item), productAdder);
  }
}

module.exports = ItemAdder;
