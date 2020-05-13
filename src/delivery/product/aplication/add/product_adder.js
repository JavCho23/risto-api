class ProductAdder {
  constructor(repository) {
    this.repository = repository;
  }
  call(idItem,product) {
    return this.repository.add(idItem,product);
  }
}

module.exports = ProductAdder;
