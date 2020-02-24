class ItemList {
  constructor(repository) {
    this.repository = repository;
  }
  call() {
    return this.repository.list();
  }
}

module.exports = ItemList;
