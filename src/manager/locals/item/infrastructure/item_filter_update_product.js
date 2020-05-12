const FilterUpdateChildEntities = require("../../../../shared/infrastructure/filter_update_child_entities");

class ItemFilterUpdateProduct extends FilterUpdateChildEntities {
  constructor(idItem, products, productLister,productUpdater, productAdder, productRemover) {
    super(idItem, products, productLister, productUpdater, productAdder, productRemover);
  }
  isEqual(niu, old) {
    return niu.idProduct.value == old.idProduct.value;
  }
  async add(idItem, product) {
    await this._entityAdder.call(idItem, product);
  }
  async remove(idItem, product) {
    await this._entityRemover.call(product.idProduct);
  }
  async update(niu, old) {
    await this._entityUpdater.call(niu);
  }
}

module.exports = ItemFilterUpdateProduct;
