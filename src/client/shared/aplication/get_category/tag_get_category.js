class GetCategory {
  constructor(repository) {
    this.repository = repository;
  }
  call(id_meal) {
    return this.repository.listTag(
      id_meal,
      "c4252845-62a6-4bf1-ac2c-c03a3300db59"
    );
  }
}

module.exports = GetCategory;
