const Item = require("../../domain/item");

class ItemUpdater {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal, item, productAdder) {
    return this.repository.update(idLocal, Item.fromJson(item), productAdder);
  }
}

module.exports = ItemUpdater;
