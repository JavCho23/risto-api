class MealFinder {
  constructor(repository) {
    this.repository = repository;
  }
  call(itemId, state) {
    return this.repository.find(itemId, state);
  }
}

module.exports = MealFinder;
