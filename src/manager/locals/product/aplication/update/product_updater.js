class ProductUpdater {
  constructor(repository) {
    this.repository = repository;
  }
  call(product) {
    return this.repository.update(product);
  }
}

module.exports = ProductUpdater;
