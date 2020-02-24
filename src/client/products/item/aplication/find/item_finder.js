class ItemFinder {
  constructor(repository) {
    this.repository = repository;
  }
  call(itemId) {
    return this.repository.find(itemId);
  }
}

module.exports = ItemFinder;
