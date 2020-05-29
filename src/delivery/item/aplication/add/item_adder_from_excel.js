const Item = require("../../domain/item");

class ItemAdderFromExcel {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal, base64String, productAdder,recordAdder) {
    return this.repository.addFromExcel(idLocal, base64String, productAdder,recordAdder);
  }
}

module.exports = ItemAdderFromExcel;
