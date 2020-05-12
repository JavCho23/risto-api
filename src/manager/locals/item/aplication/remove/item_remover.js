class ItemRemover {
  constructor(repository) {
    this.repository = repository;
  }
  call(idItem) {
    return this.repository.remove(idItem);
  }
}

module.exports = ItemRemover;
