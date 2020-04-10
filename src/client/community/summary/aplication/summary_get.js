class SummaryGet {
  constructor(repository) {
    this.repository = repository;
  }
  call(mealId, comments) {
    return this.repository.get(mealId, comments);
  }
}

module.exports = SummaryGet;
